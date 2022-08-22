import express from "express";
import multer from "multer";
import fs from "fs";
import util from "util";
import { makeDoAuthMiddleware } from "../auth/doAuthMiddleware.js";
import { postTweet } from "../use-cases/tweets/post-tweet.js";
import { postReply } from "../use-cases/tweets/post-reply.js";
import { findAll } from "../use-cases/tweets/show-feed.js";
import { findAllByUserId } from "../use-cases/tweets/show-tweets-by-user-id.js";
import { findRepliesByOriginId } from "../use-cases/tweets/show-replies-by-origin-id.js";
import { findAllFollowed } from "../use-cases/tweets/show-feed-of-followed-users.js";
import { findAllLiked } from "../use-cases/tweets/show-feed-of-tweets-liked.js";
import { delTweet } from "../use-cases/tweets/delete-tweet.js";
import { findTweet } from "../use-cases/tweets/find-tweet-by-id.js";
import { updateTweet } from "../use-cases/tweets/edit-tweet.js";
import { likeTweet } from "../use-cases/tweets/like-tweet.js";
import { resizeTweetImage } from "../utils/s3/sharp-resize.js";
import { uploadFile } from "../utils/s3/s3-tweet.js";
import { nextTick } from "process";

export const tweetsRouter = express.Router();

const doAuthMiddlewareAccess = makeDoAuthMiddleware();

tweetsRouter.use((req, res, next) => {
	console.log(req.headers);
	next();
});

tweetsRouter.get("/all", doAuthMiddlewareAccess, async (_, res) => {
	try {
		const allTweets = await findAll();
		res.status(200).json(allTweets);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.get(
	"/details/:tweetid",
	doAuthMiddlewareAccess,
	async (req, res) => {
		try {
			const tweetDetails = await findTweet(req.params.tweetid);
			const repliesById = await findRepliesByOriginId({
				tweetId: req.params.tweetid,
			});
			res.status(200).json({ tweetDetails, repliesById });
		} catch (err) {
			res.status(404).json({ message: err.message || "404 not found" });
		}
	}
);

tweetsRouter.get("/user/:userid", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const tweetsById = await findAllByUserId({ userId: req.params.userid });
		res.status(200).json(tweetsById);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.get("/followed", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const tweetsByFollowedIds = await findAllFollowed({
			userId: req.userClaims.sub,
		});
		res.status(200).json(tweetsByFollowedIds);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

// HIER MULTER als Middleware
const tweetPicStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/tweetPictures");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_tweet" + file.originalname); //Appending extension
	},
});

const uploadTweetImage = multer({ storage: tweetPicStorage }).single(
	"tweetimage"
);

const unlinkFile = util.promisify(fs.unlink);

tweetsRouter.post(
	"/newtweet",
	doAuthMiddlewareAccess,
	uploadTweetImage,
	async (req, res) => {
		try {
			const userId = req.userClaims.sub;
			if (req.file) {
				const file = req.file;
				const originalLocalFilePath = file.path;
				const newLocalFilePath = await resizeTweetImage(file);
				const awsAnswer = await uploadFile(newLocalFilePath, file);
				const s3Key = awsAnswer.key;
				const newTweet = await postTweet(req.body, userId, s3Key);
				await unlinkFile(originalLocalFilePath);
				await unlinkFile(newLocalFilePath);
				res.status(201).json(newTweet);
			} else {
				const newTweet = await postTweet(req.body, userId);
				res.status(201).json(newTweet);
			}
		} catch (err) {
			res.status(500).json({
				message: err.message || "500 internal server error",
			});
		}
	}
);

tweetsRouter.post(
	"/newreply",
	doAuthMiddlewareAccess,
	uploadTweetImage,
	async (req, res) => {
		try {
			const userId = req.userClaims.sub;
			if (req.file) {
				const file = req.file;
				const originalLocalFilePath = file.path;
				const newLocalFilePath = await resizeTweetImage(file);
				const awsAnswer = await uploadFile(newLocalFilePath, file);
				const s3Key = awsAnswer.key;
				const newTweet = await postReply(req.body, userId, s3Key);
				await unlinkFile(originalLocalFilePath);
				await unlinkFile(newLocalFilePath);
				res.status(201).json(newTweet);
			} else {
				const newReply = await postReply(req.body, userId);
				res.status(201).json(newReply);
			}
		} catch (err) {
			res.status(500).json({
				message: err.message || "500 internal server error",
			});
		}
	}
);

tweetsRouter.get("/liked/:userid", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const tweetsLiked = await findAllLiked({ userId: req.params.userid });
		res.status(200).json(tweetsLiked);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.delete("/delete", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const deleteTweet = await delTweet(req.body);
		res.status(201).json(deleteTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

tweetsRouter.put("/edit", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const editedTweet = await updateTweet(req.body);
		res.status(201).json(editedTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

tweetsRouter.put("/like", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const userId = req.userClaims.sub;
		const likedTweet = await likeTweet({
			tweetId: req.body.tweetId,
			userId,
		});
		res.status(201).json(likedTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

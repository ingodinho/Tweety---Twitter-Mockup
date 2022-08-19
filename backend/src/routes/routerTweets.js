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

export const tweetsRouter = express.Router();

const doAuthMiddlewareAccess = makeDoAuthMiddleware();

tweetsRouter.get("/all", async (_, res) => {
	try {
		const allTweets = await findAll();
		res.status(200).json(allTweets);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.get("/details/:tweetid", async (req, res) => {
	try {
		const tweetDetails = await findTweet(req.params.tweetid);
		const repliesById = await findRepliesByOriginId({
			tweetId: req.params.tweetid,
		});
		res.status(200).json({ tweetDetails, repliesById });
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.get("/user/:userid", async (req, res) => {
	try {
		const tweetsById = await findAllByUserId({ userId: req.params.userid });
		res.status(200).json(tweetsById);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.get("/followed/:userid", async (req, res) => {
	try {
		const tweetsByFollowedIds = await findAllFollowed({
			userId: req.params.userid,
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
			const file = req.file;
			const newTweets = await postTweet(req.body, userId);
			const originalLocalFilePath = file.path;
			res.status(201).json(newTweets);
		} catch (err) {
			res.status(500).json({
				message: err.message || "500 internal server error",
			});
		}
	}
);

tweetsRouter.post("/newreply", async (req, res) => {
	try {
		const newReply = await postReply(req.body);
		res.status(201).json(newReply);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

tweetsRouter.get("/liked/:userid", async (req, res) => {
	try {
		const tweetsLiked = await findAllLiked({ userId: req.params.userid });
		res.status(200).json(tweetsLiked);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

tweetsRouter.delete("/delete", async (req, res) => {
	try {
		const deleteTweet = await delTweet(req.body);
		console.log(req.body);
		res.status(201).json(deleteTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

tweetsRouter.put("/edit", async (req, res) => {
	try {
		const editedTweet = await updateTweet(req.body);
		console.log(req.body);
		res.status(201).json(editedTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

tweetsRouter.put("/like", async (req, res) => {
	try {
		const likedTweet = await likeTweet(req.body);
		res.status(201).json(likedTweet);
	} catch (err) {
		res.status(500).json({
			message: err.message || "500 internal server error",
		});
	}
});

import express from "express";
import { searchAll } from "../use-cases/search/search-by-keyword.js";
import { topTweets } from "../use-cases/search/search-top-tweets.js";
import { topUsers } from "../use-cases/search/search-top-users.js";
import { makeDoAuthMiddleware } from "../auth/doAuthMiddleware.js";

export const searchRouter = express.Router();

const doAuthMiddlewareAccess = makeDoAuthMiddleware();

searchRouter.get("/toptweets", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const searchResult = await topTweets();
		res.status(200).json(searchResult);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

searchRouter.get("/topusers", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const searchResult = await topUsers();
		res.status(200).json(searchResult);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

searchRouter.get("/:keyword", doAuthMiddlewareAccess, async (req, res) => {
	try {
		const searchResult = await searchAll(req.params.keyword);
		console.log(searchResult);
		res.status(200).json(searchResult);
	} catch (err) {
		res.status(404).json({ message: err.message || "404 not found" });
	}
});

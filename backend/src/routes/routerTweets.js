import express from 'express';
import { postTweet } from '../use-cases/tweets/post-tweet.js';

export const tweetsRouter = express.Router();

tweetsRouter.get('/allTweets', async (_, res) => {
    try {
        const allTweets = await findAllTweets()
        res.status(200).json(allTweets);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
})

tweetsRouter.post('/newTweet', async (req, res) => {
    try {
        const newTweets = await postTweet(req.body)
        res.status(201).json(newTweets);
    } catch (err) {
        res.status(500).json({ message: err.message || "500 internal server error" });
    }
})
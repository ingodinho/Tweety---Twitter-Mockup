import express from 'express';

export const searchRouter = express.Router();

searchRouter.get('/search?keyword={keyword}', async (req, res) => {
    try {
        console.log(keyword);
        const allTweets = await findAll()
        res.status(200).json(allTweets);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
})
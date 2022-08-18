import express from 'express';
import { searchAll } from '../use-cases/search/search-by-keyword.js'

export const searchRouter = express.Router();

searchRouter.get('/:keyword', async (req, res) => {
    try {
        const searchResult = await searchAll(req.params.keyword)
        res.status(200).json(searchResult);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
})
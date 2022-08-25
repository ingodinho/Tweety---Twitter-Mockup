import express from 'express';
import {findMessagesByRoomId} from "../db-access/messenger-dao.js";

export const messagesRouter = express.Router();

messagesRouter.get('/private/:roomid', async (req, res) => {
    const roomId = req.params.roomid;
    console.log('roomid', roomId);
    try {
        const messagesArray = await findMessagesByRoomId(roomId);
        res.status(200).json(messagesArray);
    } catch (err) {
        res.status(400).json({msg: 'Funktioniert nicht'})
    }
})

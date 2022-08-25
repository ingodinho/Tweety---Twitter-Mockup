import { getDB } from "./getDB.js";
import { ObjectId } from "mongodb";

const collectionName = "messenger";

export const insertMessage = async (message) => {
    const db = await getDB();
    const {insertedId} = await db.collection(collectionName).insertOne(message);
    return insertedId;
}

export const findMessagesByRoomId = async (roomId) => {
    const db = await getDB();
    console.log('router', roomId)
    const messagesArray = await db.collection(collectionName).find({room: roomId}).toArray();
    // const messagesArray = await db.collection(collectionName).find().toArray();
    return messagesArray;
}
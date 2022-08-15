import { getDB } from './getDB.js';
import { ObjectId } from 'mongodb';

const collectionName = "tweets"

const findAllTweets = async () => {
    const db = await getDB();
    const posts = await db.collection(collectionName).find().toArray();
    return posts;
}

const findTweetsById = async (userId) => {
    const db = await getDB();
    const foundPosts = await db.collection(collectionName).find({ postedBy: userId }).toArray();
    return foundPosts;
}

const insertOneTweet = async (tweet) => {
    const db = await getDB();
    return db.collection(collectionName).insertOne(tweet)
}


export default {
    findAllTweets,
    findTweetsById,
    insertOneTweet
}
import { getDB } from './getDB.js';
import { ObjectId } from 'mongodb';

const collectionName = "tweets"

const findAllTweets = async () => {
    const db = await getDB();
    const posts = await db.collection(collectionName)
    .find({replyTo: null})
    .sort({postedAt: -1})
    .toArray();
    return posts;
}

const findTweetById = async (tweetId) => {
    const db = await getDB();
    const tweetResult = await db.collection(collectionName)
    .find({$and: [{_id: ObjectId(tweetId)}, {replyTo: null}]})
    .sort({postedAt: -1})
    .toArray()
    return tweetResult;
}

const findAllTweetsByUserId = async (userId) => {
    const db = await getDB();
    const foundPosts = await db.collection(collectionName)
    .find({$and: [{postedBy: userId}, {replyTo: null}]})
    .sort({postedAt: -1})
    .toArray()
    return foundPosts;
}

const findTweetsByKeyword = async (keyword) => {
    const db = await getDB();
    const foundPosts = await db.collection(collectionName)
    .find({$and: [{$contains:{content: keyword}}, {replyTo: null}]})
    .sort({postedAt: -1})
    .toArray()
    return foundPosts;
}

const findAllTweetsOfFollowedUsers = async (userId) => {
    const db = await getDB();
    const foundUser = await db.collection("users").find({_id: ObjectId(userId)}).toArray();
    const followedUserIds = foundUser[0].following
    console.log("FollowedUsers", followedUserIds);
    const repliesPackage = await db.collection(collectionName)
    .find({$and: [{postedBy: {$in: followedUserIds}}, {replyTo: null}]})
    .sort({postedAt: -1})
    .toArray()
    return repliesPackage;
}

const findAllLikedTweets = async (userId) => {
    const db = await getDB();
    const foundUser = await db.collection("users").find({_id: ObjectId(userId)}).toArray();
    const followedTweetIds = foundUser[0].likedTweets
    const tweetsPackage = await db.collection(collectionName)
    .find({_id: {$in: followedTweetIds.map((id) => ObjectId(id))}})
    .sort({postedAt: -1})
    .toArray()
    return tweetsPackage;
}

const findAllRepliesByOriginId = async (tweetId) => {
    const db = await getDB();
    const foundReplies = await db.collection(collectionName)
    .find({_id: ObjectId(tweetId)})
    .toArray();
    const replyIds = foundReplies[0].replies
    console.log(replyIds);
    const repliesPackage = await db.collection(collectionName)
    .find({_id: {$in: replyIds}})
    .sort({postedAt: -1})
    .toArray()
    return repliesPackage;
}

const insertOneTweet = async (tweet) => {
    const db = await getDB();
    return db.collection(collectionName).insertOne(tweet)
}

const insertOneReply = async (reply) => {
    const db = await getDB();
    return db.collection(collectionName).insertOne(reply)
}

const deleteTweetById = async (tweetId) => {
    const db = await getDB();
    return db.collection(collectionName).deleteOne({_id: ObjectId(tweetId)})
}

const editTweet = async (tweetId, tweet) => {
    const db = await getDB();
    return db.collection(collectionName).findOneAndUpdate({_id: ObjectId(tweetId)}, 
    {$set: {
        lastEditedAt: tweet.lastEditedAt,
        content: tweet.content
    }}
    )
}

const insertReplyIdToOrigin = async (replyToId, replyId) => {
    const db = await getDB();
    return db.collection(collectionName).findOneAndUpdate({_id: ObjectId(replyToId)}, 
    {$push: {replies: replyId}}
    )
}

const likeUnlikeTweet = async (tweetId, userId) => {
    const db = await getDB();
    const foundTweet = await db.collection(collectionName).find({_id: ObjectId(tweetId)}).toArray();
    const likesArr = foundTweet[0].likes
    likesArr.includes(userId)
    ? likesArr.splice(likesArr.indexOf(userId), 1)
    : likesArr.push(userId)
    const newLikesArr = [...likesArr]
    return db.collection(collectionName).findOneAndUpdate({_id: ObjectId(tweetId)}, {$set: {likes: newLikesArr}}, {returnDocument: "after"}, 
    )
}

export default {
    findAllTweets,
    findAllTweetsByUserId,
    insertOneTweet,
    insertOneReply,
    deleteTweetById,
    editTweet,
    likeUnlikeTweet,
    insertReplyIdToOrigin,
    findAllRepliesByOriginId,
    findTweetById,
    findAllTweetsOfFollowedUsers,
    findTweetsByKeyword,
    findAllLikedTweets
}
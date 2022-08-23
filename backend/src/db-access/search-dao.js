import { getDB } from "./getDB.js";

const tweetsColl = "tweets";
const usersColl = "users";

const searchTweetsByKeyword = async (keyword) => {
	const db = await getDB();
	const foundTweets = await db
		.collection(tweetsColl)
		.find({ $or: [{ content: { $regex: new RegExp(keyword, "i") } }] })
		.sort({ postedAt: -1 })
		.toArray();
	const foundUsers = await db
		.collection(usersColl)
		.find({
			$or: [
				{ username: { $regex: new RegExp(keyword, "i") } },
				{ firstName: { $regex: new RegExp(keyword, "i") } },
				{ lastName: { $regex: new RegExp(keyword, "i") } },
			],
		})
		.sort({ postedAt: -1 })
		.toArray();

	return { foundUsers, foundTweets };
};

const searchTopTweets = async () => {
	const db = await getDB();
	const foundTweets = await db
		.collection(tweetsColl)
		.find({ replies: { $not: { $size: 0 } } })
		.sort({ postedAt: -1 })
		.toArray();
	return { foundTweets };
};

const searchTopUsers = async () => {
	const db = await getDB();
	const foundUsers = await db
		.collection(usersColl)
		.find({ likedTweets: { $not: { $size: 0 } } })
		.sort({ postedAt: -1 })
		.toArray();
	return { foundUsers };
};

export default {
	searchTweetsByKeyword,
	searchTopTweets,
	searchTopUsers,
};

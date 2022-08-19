import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const postTweet = async ({ content }, userId, s3Key = null) => {
	const tweet = makeTweet({
		content,
		postedBy: userId,
		postedAt: Date.now(),
		replies: [],
		likes: [],
		retweets: [],
		imgLink: s3Key,
	});
	const tweetResult = await TweetsDAO.insertOneTweet(tweet);
	return tweetResult;
};

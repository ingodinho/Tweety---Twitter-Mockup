import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const postTweet = async ({ content, userId }) => {
	const tweet = makeTweet({
		content,
		postedBy: userId,
		postedAt: Date.now(),
		replies: [],
		likes: [],
		retweets: [],
	});
	const tweetResult = await TweetsDAO.insertOneTweet(tweet);
	return tweetResult;
};

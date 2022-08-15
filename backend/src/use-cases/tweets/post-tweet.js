import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const postTweet = async ({ content, _id }) => {
    const tweet = makeTweet(
        {
            content,
            postedBy: _id,
            postedAt: Date.now(),
            replies: [],
            likes: [],
            retweets: []
        }
    )
    const tweetResult = await TweetsDAO.insertOneTweet(tweet);
    return tweetResult
}
import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const updateTweet = async ({ content, tweetId, userId }) => {
    const tweet = makeTweet(
        {
            _id: tweetId,
            content: content,
            postedBy: userId,
            lastEditedAt: Date.now(),
        }
    )
    console.log(tweet);
    const editedTweetResult = await TweetsDAO.editTweet(tweetId, tweet);
    return editedTweetResult
}
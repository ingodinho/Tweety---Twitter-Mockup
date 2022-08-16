import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const likeTweet = async ({ tweetId, userId }) => {
    const tweet = makeTweet(
        {
            _id: tweetId,
            postedBy: userId,
        }
    )
    const likedTweetResult = await TweetsDAO.likeUnlikeTweet(tweetId, userId);
    return likedTweetResult
}
import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findTweet = async (tweetId) => {
    const wantedTweet = await TweetsDAO.findTweetById(tweetId);
    const result = await expandTweetWithUserData(wantedTweet)
    return result;
}
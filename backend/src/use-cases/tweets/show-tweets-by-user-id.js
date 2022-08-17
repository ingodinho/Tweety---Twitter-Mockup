import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findAllByUserId = async ({userId}) => {
    const allTweets = await TweetsDAO.findAllTweetsByUserId(userId);
    const result = await expandTweetWithUserData(allTweets)
    return result;
}
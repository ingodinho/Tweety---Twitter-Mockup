import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findAll = async () => {
    const allTweets = await TweetsDAO.findAllTweets();
    const result = await expandTweetWithUserData(allTweets)
    return {result};
}
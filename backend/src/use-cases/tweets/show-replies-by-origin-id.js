import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findRepliesByOriginId = async ({tweetId}) => {
    const allRepliesByOrigin = await TweetsDAO.findAllRepliesByOriginId(tweetId);
    const result = await expandTweetWithUserData(allRepliesByOrigin)
    return {result};
}
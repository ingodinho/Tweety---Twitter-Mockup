import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findAllFollowed = async ({userId}) => {
    const followedTweets = await TweetsDAO.findAllTweetsOfFollowedUsers(userId);
    const result = await expandTweetWithUserData(followedTweets)
    return {result};
}
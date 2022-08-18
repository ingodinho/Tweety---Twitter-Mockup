import TweetsDAO from "../../db-access/tweets-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const findAllLiked = async ({userId}) => {
    const likedTweets = await TweetsDAO.findAllLikedTweets(userId);
    const result = await expandTweetWithUserData(likedTweets)
    return {result};
}
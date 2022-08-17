import TweetsDAO from "../../db-access/tweets-dao.js";
import UsersDAO from "../../db-access/users-dao.js";

export const likeTweet = async ({ tweetId, userId }) => {
    const likedTweetResult = await TweetsDAO.likeUnlikeTweet(tweetId, userId);
    const tweetsLikedResult = await UsersDAO.tweetsLiked(tweetId, userId);
    return {likedTweetResult, tweetsLikedResult}
}
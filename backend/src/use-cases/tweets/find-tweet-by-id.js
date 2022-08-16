import TweetsDAO from "../../db-access/tweets-dao.js";

export const findTweet = async (tweetId) => {
    const wantedTweet = await TweetsDAO.findTweetById(tweetId);
    console.log(wantedTweet);
    return wantedTweet;
}
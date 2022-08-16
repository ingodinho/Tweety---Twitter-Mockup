import TweetsDAO from "../../db-access/tweets-dao.js";

export const delTweet = async ({tweetId}) => {
    const allTweets = await TweetsDAO.deleteTweetById(tweetId);
    console.log(allTweets);
    return allTweets;
}
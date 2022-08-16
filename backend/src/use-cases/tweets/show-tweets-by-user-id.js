import TweetsDAO from "../../db-access/tweets-dao.js";

export const findAllByUserId = async ({userId}) => {
    const allTweets = await TweetsDAO.findAllTweetsByUserId(userId);
    console.log(allTweets);
    return allTweets;
}
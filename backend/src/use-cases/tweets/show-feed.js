import TweetsDAO from "../../db-access/tweets-dao.js";

export const findAll = async () => {
    const allTweets = await TweetsDAO.findAllTweets();
    console.log(allTweets);
    return allTweets;
}
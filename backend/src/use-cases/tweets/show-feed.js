import TweetsDAO from "../../db-access/tweets-dao.js";

export const findAll = async () => {
    const allTweeds = await TweetsDAO.findAllTweets();
    console.log(allTweeds);
    return allTweeds;
}
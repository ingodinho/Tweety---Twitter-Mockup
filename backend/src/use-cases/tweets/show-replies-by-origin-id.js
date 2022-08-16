import TweetsDAO from "../../db-access/tweets-dao.js";

export const findRepliesByOriginId = async ({tweetId}) => {
    const allRepliesByOrigin = await TweetsDAO.findAllRepliesByOriginId(tweetId);
    // console.log(allRepliesByOrigin);
    return allRepliesByOrigin;
}
import SearchDAO from "../../db-access/search-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const topTweets = async () => {
    const tweetsSearch = await SearchDAO.searchTopTweets();
    const tweetsResult = await expandTweetWithUserData(tweetsSearch.foundTweets)
    return {tweetsResult};
}
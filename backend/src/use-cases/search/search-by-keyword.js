import SearchDAO from "../../db-access/search-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";

export const searchAll = async (keyword) => {
	const tweetsWithKeyword = await SearchDAO.searchTweetsByKeyword(keyword);
	const usersResult = tweetsWithKeyword.foundUsers;
	const tweetsResult = await expandTweetWithUserData(
		tweetsWithKeyword.foundTweets
	);
	return { tweetsResult, usersResult };
};

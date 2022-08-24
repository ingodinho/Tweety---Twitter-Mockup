import SearchDAO from "../../db-access/search-dao.js";
import { expandTweetWithUserData } from "../../utils/expandTweetWithUserData.js";
import { generateSignedAvatarUrl } from "../../utils/s3/s3-avatar-signature.js";

export const searchAll = async (keyword) => {
	const tweetsWithKeyword = await SearchDAO.searchTweetsByKeyword(keyword);
	const usersResult = tweetsWithKeyword.foundUsers;
	const userDataArray = await Promise.all(
		usersResult.map(async (user) => {
			const avatarKey = user.profilePictureLink;
			const avatarLink = await generateSignedAvatarUrl(avatarKey);
			user.profilePictureLink = avatarLink;
			const userResult = {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				profilePictureLink: user.profilePictureLink,
				bio: user.bio,
				followedBy: user.followedBy,
			};
			return userResult;
		})
	);

	const tweetsResult = await expandTweetWithUserData(
		tweetsWithKeyword.foundTweets
	);

	return { tweetsResult, usersResult: userDataArray };
};

import UsersDAO from "../db-access/users-dao.js";
import { ObjectId } from "mongodb";
import { generateSignedUrl } from "./s3/s3-signature.js";

export const expandTweetWithUserData = async (tweetArray) => {
	const userIds = tweetArray.map((tweet) => {
		return ObjectId(tweet.postedBy);
	});
	const userData = await UsersDAO.findUserData(userIds);
	const newUserData = await Promise.all(
		userData.map(async (user) => {
			const avatarKey = user.profilePictureLink;
			const bannerKey = user.bannerPictureLink;
			console.log(user);
			// console.log("bannerky: " + bannerKey);
			const avatarLink = await generateSignedUrl(avatarKey);
			const bannerLink = await generateSignedUrl(bannerKey);
			user.profilePictureLink = avatarLink;
			user.bannerPictureLink = bannerLink;
			return user;
		})
	);
	const result = tweetArray.map((tweet) => {
		const tweetUser = newUserData.find((user) => {
			return tweet.postedBy === user._id.toString();
		});
		return { ...tweet, postedBy: tweetUser };
	});
	return result;
};

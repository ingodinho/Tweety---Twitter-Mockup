import UsersDAO from "../db-access/users-dao.js";
import { ObjectId } from "mongodb";
import { generateSignedUrl } from "./s3/s3-tweet-signature.js";

export const expandTweetWithUserData = async (tweetArray) => {
	const userIds = tweetArray.map((tweet) => {
		return ObjectId(tweet.postedBy);
	});
	const userData = await UsersDAO.findUserData(userIds);
	// generate signed s3 link for profile pictures
	const newUserData = await Promise.all(
		userData.map(async (user) => {
			const avatarKey = user.profilePictureLink;
			const bannerKey = user.bannerPictureLink;
			const avatarLink = await generateSignedUrl(avatarKey);
			const bannerLink = await generateSignedUrl(bannerKey);
			user.profilePictureLink = avatarLink;
			user.bannerPictureLink = bannerLink;
			return user;
		})
	);
	// generate signed s3 link for tweet picture
	const updatedTweetArray = await Promise.all(
		tweetArray.map(async (tweet) => {
			const tweetImageKey = tweet.imgLink;
			const tweetImgLink = await generateSignedUrl(tweetImageKey);
			tweet.imgLink = tweetImgLink;
			return tweet;
		})
	);

	const result = updatedTweetArray.map((tweet) => {
		const tweetUser = newUserData.find((user) => {
			return tweet.postedBy === user._id.toString();
		});
		return { ...tweet, postedBy: tweetUser };
	});
	return result;
};

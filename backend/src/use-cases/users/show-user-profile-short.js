import UserDAO from "../../db-access/users-dao.js";
import { generateSignedUrl } from "../../utils/s3/s3-avatar-signature.js";

export const showUserProfileShort = async (userId) => {
	console.log(userId);
	const foundUser = await UserDAO.findUserById(userId);
	if (!foundUser) {
		throw new Error("User not found");
	}
	console.log(foundUser);
	const avatarKey = foundUser.profilePictureLink;
	const avatarLink = await generateSignedUrl(avatarKey);

	return {
		username: foundUser.username,
		firstName: foundUser.firstName,
		lastName: foundUser.lastName,
		profilePictureLink: avatarLink,
		following: foundUser.following.length,
		followedBy: foundUser.followedBy.length,
	};
};

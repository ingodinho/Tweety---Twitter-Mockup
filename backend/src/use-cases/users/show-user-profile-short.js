import UserDAO from "../../db-access/users-dao.js";
import { generateSignedAvatarUrl } from "../../utils/s3/s3-avatar-signature.js";

export const showUserProfileShort = async (userId) => {
	const foundUser = await UserDAO.findUserById(userId);
	if (!foundUser) {
		throw new Error("User not found");
	}
	const avatarKey = foundUser.profilePictureLink;
	const avatarLink = await generateSignedAvatarUrl(avatarKey);

	return {
		username: foundUser.username,
		firstName: foundUser.firstName,
		lastName: foundUser.lastName,
		bio: foundUser.bio,
		profilePictureLink: avatarLink,
		following: foundUser.following.length,
		followedBy: foundUser.followedBy.length,
	};
};

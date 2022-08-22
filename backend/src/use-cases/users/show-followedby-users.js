import UserDAO from "../../db-access/users-dao.js";
import { generateSignedAvatarUrl } from "../../utils/s3/s3-avatar-signature.js";

export const showFollowedbyUsers = async (userId) => {
	const foundUser = await UserDAO.findUserById(userId);
	const followedbyUserIdsArray = foundUser.followedBy;

	const userDataArray = await Promise.all(
		followedbyUserIdsArray.map(async (user) => {
			const followedbyUser = await UserDAO.findUserById(user);

			const avatarKey = followedbyUser.profilePictureLink;
			const avatarLink = await generateSignedAvatarUrl(avatarKey);
			followedbyUser.profilePictureLink = avatarLink;

			const followedbyUserData = {
				_id: followedbyUser._id,
				profilePictureLink: followedbyUser.profilePictureLink,
				firstName: followedbyUser.firstName,
				lastName: followedbyUser.lastName,
				userName: followedbyUser.username,
				bio: followedbyUser.bio,
			};

			return followedbyUserData;
		})
	);

	return userDataArray;
};

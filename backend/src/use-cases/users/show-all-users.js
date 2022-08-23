import UserDAO from "../../db-access/users-dao.js";
import { generateSignedAvatarUrl } from "../../utils/s3/s3-avatar-signature.js";

export const showAllUsers = async () => {
	const usersArray = await UserDAO.findAllUsers();
	const userDataArray = await Promise.all(
		usersArray.map(async (user) => {
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
	return userDataArray;
};

import UserDAO from "../../db-access/users-dao.js";
import { deleteFile } from "../../utils/s3/s3-profile.js";

export const deleteUserAvatar = async (userId) => {
	const foundUser = await UserDAO.findUserById(userId);
	console.log(foundUser);

	if (foundUser.profilePictureLink) {
		const s3deleteResult = await deleteFile(foundUser.profilePictureLink);
		const insertResult = await UserDAO.findOneAndUpdateAvatar({
			userId,
			avatarImagePath: null,
		});
		return { s3deleteResult, insertResult };
	} else {
		throw new Error("profile picture not found");
	}
};

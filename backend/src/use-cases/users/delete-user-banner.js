import UserDAO from "../../db-access/users-dao.js";
import { deleteFile } from "../../utils/s3/s3-profile.js";

export const deleteUserBanner = async (userId) => {
	const foundUser = await UserDAO.findUserById(userId);
	console.log(foundUser);

	if (foundUser.bannerPictureLink) {
		const s3deleteResult = await deleteFile(foundUser.bannerPictureLink);
		const insertResult = await UserDAO.findOneAndUpdateBanner({
			userId,
			bannerImagePath: null,
		});
		return { s3deleteResult, insertResult };
	} else {
		throw new Error("banner picture not found");
	}
};

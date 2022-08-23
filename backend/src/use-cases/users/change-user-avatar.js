import UserDAO from "../../db-access/users-dao.js";

export const changeUserAvatar = async (userId, avatarImagePath) => {
	const insertResult = await UserDAO.findOneAndUpdateAvatar({
		userId,
		avatarImagePath,
	});

	if (!insertResult) {
		throw new Error("User not found");
	}

	return insertResult.ok;
};

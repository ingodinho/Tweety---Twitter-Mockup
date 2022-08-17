import UserDAO from "../../db-access/users-dao.js";

export const deleteUserAvatar = async (userId) => {

    const insertResult = await UserDAO.findOneAndUpdateAvatar({ userId, avatarImagePath: null })

    return insertResult;
}
import UserDAO from "../../db-access/users-dao.js";

export const changeUserBanner = async (userId, bannerImagePath) => {

    const insertResult = await UserDAO.findOneAndUpdateBanner({ userId, bannerImagePath })

    return insertResult;
}
import UserDAO from "../../db-access/users-dao.js";
import { makeUser } from "../../domain/User.js";
import { createToken } from "../../utils/createToken.js";

export const refreshUserToken = async ({ userId }) => {
    const foundUser = await UserDAO.findUserById(userId);
    if (!foundUser) {
        throw new Error("User not found")
    };

    const user = makeUser(foundUser);

    const accessToken = createToken(user);

    return accessToken;
};
import UserDAO from "../../db-access/users-dao.js";
import { createHash } from "../../utils/token/hash.js";
import { createToken } from "../../utils/token/createToken.js";

export const loginUser = async ({ email, username, password }) => {
    let user;
    if (email) {
        user = await UserDAO.findUserByEmail(email);
    } else if (username) {
        user = await UserDAO.findUserByUsername(username);
    } else {
        throw new Error('Username or Email must be typed in');
    }

    const passwordHash = createHash(password + user.passwordSalt);

    const correctPassword = passwordHash === user.passwordHash;
    if (!correctPassword) {
        throw new Error('Invalid password');
    }

    const accessToken = createToken(user);
    const oneDay = 60 * 60 * 24;
    const refreshToken = createToken(user, oneDay, 'refresh');

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken,
        refreshToken,
    };
}
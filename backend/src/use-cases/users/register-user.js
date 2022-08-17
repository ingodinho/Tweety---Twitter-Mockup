import UserDAO from "../../db-access/users-dao.js";
import { makeUser } from "../../domain/User.js";
import { createHash, createRandomHash } from "../../utils/token/hash.js";

export const registerUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
    dob,
    bio
}) => {
    const passwordSalt = createRandomHash()
    const passwordHash = createHash(password + '' + passwordSalt)
    const sixDigitCode = Math.random().toString().substring(2, 8);

    const newUser = makeUser({
        username,
        firstName,
        lastName,
        email,
        dob,
        bio,
        emailVerified: false,
        sixDigitCode: sixDigitCode,
        passwordHash,
        passwordSalt,
        createdAt: Date.now(),
        likedTweets: [],
        following: [],
        followedBy: []
    })

    const insertResult = await UserDAO.insertOneUser(newUser)
    const userView = ({
        userId: insertResult.insertedId,
        username,
        email,
    })

    return userView

}
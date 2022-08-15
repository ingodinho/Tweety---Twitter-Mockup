import UserDAO from "../../db-access/users-dao.js";
import { makeUser } from "../../domain/User.js";
import { hash, createRandomHash } from "../../utils/hash.js";

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
    const passwordHash = hash(password + '' + passwordSalt)

    const newUser = makeUser({
        username,
        firstName,
        lastName,
        email,
        dob,
        bio,
        emailVerified: false,
        passwordHash,
        passwordSalt,
        createdAt: Date.now()
    })

    const insertResult = await UserDAO.insertOneUser(newUser)
    const userView = ({
        _id: insertResult.insertedId,
        username,
        email,
    })

    return userView

}
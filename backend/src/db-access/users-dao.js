import { getDB } from './getDB.js';
import { ObjectId } from 'mongodb';

const usersCollectionName = "users";

const findAllUsers = async () => {
    const db = await getDB();
    const users = await db.collection(usersCollectionName).find().toArray();
    return users;
}

const findUserById = async (userId) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOne({ _id: ObjectId(userId) });
    return foundUser;
}

const findUserByUsername = async (username) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOne({ username: username });
    return foundUser;
}

const findUserByEmail = async (email) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOne({ email: email });
    return foundUser;
}

const insertOneUser = async (userInfo) => {
    const db = await getDB();
    const newUser = await db.collection(usersCollectionName).insertOne(userInfo);
    return newUser;
}

const updateOneUser = async (updateUserInfo) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOneAndUpdate(
        { _id: ObjectId(updateUserInfo._id) },
        {
            $set: {
                username: updateUserInfo.username,
                firstName: updateUserInfo.firstName,
                lastName: updateUserInfo.lastName,
                dob: updateUserInfo.dob,
                bio: updateUserInfo.bio,
                passwordHash: updateUserInfo.passwordHash,
                passwordSalt: updateUserInfo.passwordSalt
            }
        },
        { returnDocument: "after" }
    )
    return foundUser;
}



const findOneAndUpdateAvatar = async ({ userId, avatarImage }) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: { profilePictureLink: avatarImage } },
        { returnDocument: "after" }
    )
}

export default {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByEmail,
    insertOneUser,
    updateOneUser
};

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

const insertOneUser = async (userInfo) => {
    const db = await getDB();
    return db.collection(usersCollectionName).insertOne(userInfo);
}

const updateOneUser = async (updateUserInfo) => {
    const db = await getDB();
    const foundUser = await db.collection(usersCollectionName).findOneAndUpdate(
        { _id: ObjectId(userInfo) },
        {
            $set: {
                name: updateUserInfo.name,
                dob: updateUserInfo.dob,
                username: updateUserInfo.username,
                profilePictureLink: updateUserInfo.profilePictureLink,
                bio: updateUserInfo.bio,
            }
        }
    )
}

export default {
    findAllUsers,
    findUserById,
    insertOneUser,
    updateOneUser
};

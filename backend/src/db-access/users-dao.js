import { getDB } from "./getDB.js";
import { ObjectId } from "mongodb";

const usersCollectionName = "users";

const findAllUsers = async () => {
	const db = await getDB();
	const users = await db.collection(usersCollectionName).find().toArray();
	return users;
};

const findUserById = async (userId) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOne({ _id: ObjectId(userId) });
	return foundUser;
};

const findUserData = async (userIds) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.find({ _id: { $in: userIds } })
		.toArray();
	const filteredUserData = foundUser.map((user) => {
		return {
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			profilePictureLink: user.profilePictureLink,
			bannerPictureLink: user.bannerPictureLink,
		};
	});
	return filteredUserData;
};

const findUserByUsername = async (username) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOne({ username: username });
	return foundUser;
};

const findUserByEmail = async (email) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOne({ email: email });
	return foundUser;
};

const insertOneUser = async (userInfo) => {
	const db = await getDB();
	const newUser = await db
		.collection(usersCollectionName)
		.insertOne(userInfo);
	return newUser;
};

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
				passwordSalt: updateUserInfo.passwordSalt,
			},
		},
		{ returnDocument: "after" }
	);
	return foundUser;
};

const findOneAndUpdateAvatar = async ({ userId, avatarImagePath }) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(userId) },
			{ $set: { profilePictureLink: avatarImagePath } },
			{ returnDocument: "after" }
		);
	return foundUser;
};

const findOneAndUpdateBanner = async ({ userId, bannerImagePath }) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(userId) },
			{ $set: { bannerPictureLink: bannerImagePath } },
			{ returnDocument: "after" }
		);
	return foundUser;
};

const findOneAndUpdateVerifiedStatus = async ({ userId, emailVerified }) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(userId) },
			{ $set: { emailVerified: emailVerified } },
			{ returnDocument: "after" }
		);
	return foundUser;
};

// Setzt die User bei .following - wem folge ich
const followUnfollowUser = async (userId, followUserId) => {
	const db = await getDB();

	const foundUser = await db
		.collection(usersCollectionName)
		.find({ _id: ObjectId(userId) })
		.toArray();
	const followsArr = foundUser[0].following;
	followsArr.includes(followUserId)
		? followsArr.splice(followsArr.indexOf(followUserId), 1)
		: followsArr.push(followUserId);
	const newFollowsArr = [...followsArr];

	return db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(userId) },
			{ $set: { following: newFollowsArr } },
			{ returnDocument: "after" }
		);
};

// Setzt die User bei .followedBy - von wem wir mir gefolgt
const followedUser = async (userId, followUserId) => {
	const db = await getDB();
	const foundFollowedUser = await db
		.collection(usersCollectionName)
		.find({ _id: ObjectId(followUserId) })
		.toArray();
	const followedByArr = foundFollowedUser[0].followedBy;
	followedByArr.includes(userId)
		? followedByArr.splice(followedByArr.indexOf(userId), 1)
		: followedByArr.push(userId);
	const newFollowedByArr = [...followedByArr];

	return db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(followUserId) },
			{ $set: { followedBy: newFollowedByArr } },
			{ returnDocument: "after" }
		);
};

const tweetsLiked = async (tweetId, userId) => {
	const db = await getDB();
	const foundUser = await db
		.collection(usersCollectionName)
		.find({ _id: ObjectId(userId) })
		.toArray();
	const likesArr = foundUser[0].likedTweets;
	likesArr.includes(tweetId)
		? likesArr.splice(likesArr.indexOf(tweetId), 1)
		: likesArr.push(tweetId);
	const newLikesArr = [...likesArr];
	return db
		.collection(usersCollectionName)
		.findOneAndUpdate(
			{ _id: ObjectId(userId) },
			{ $set: { likedTweets: newLikesArr } },
			{ returnDocument: "after" }
		);
};

export default {
	findAllUsers,
	findUserById,
	findUserByUsername,
	findUserByEmail,
	insertOneUser,
	updateOneUser,
	findUserData,
	followUnfollowUser,
	followedUser,
	tweetsLiked,
	findOneAndUpdateAvatar,
	findOneAndUpdateBanner,
	findOneAndUpdateVerifiedStatus,
};

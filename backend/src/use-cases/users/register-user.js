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
	bio,
}) => {
	const passwordre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

	if (!password.match(passwordre)) {
		throw new Error(
			"Password must contain at least 8 characters. Must contain at least 1 character. Must contain at least 1 digit. Must contain at least 1 special character."
		);
	}

	const passwordSalt = createRandomHash();
	const passwordHash = createHash(password + "" + passwordSalt);
	const sixDigitCode = Math.random().toString().substring(2, 8);

	const newUser = await makeUser({
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
		followedBy: [],
	});

	const insertResult = await UserDAO.insertOneUser(newUser);
	const userView = {
		userId: insertResult.insertedId,
		username,
		email,
	};

	return userView;
};

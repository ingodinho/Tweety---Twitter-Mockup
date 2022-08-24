import UserDAO from "../../db-access/users-dao.js";
import { makeUser } from "../../domain/User.js";
import { createHash, createRandomHash } from "../../utils/token/hash.js";

export const editUser = async (
	userId,
	{ username, firstName, lastName, password, bio }
) => {
	const user = await UserDAO.findUserById(userId);

	if (username) user.username = username;
	if (firstName) user.firstName = firstName;
	if (lastName) user.lastName = lastName;
	if (bio) user.bio = bio;

	if (password) {
		const passwordre =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

		if (!password.match(passwordre)) {
			throw new Error(
				"Password must contain at least 8 characters. Must contain at least 1 character. Must contain at least 1 digit. Must contain at least 1 special character."
			);
		}

		user.passwordSalt = createRandomHash();
		user.passwordHash = createHash(password + "" + user.passwordSalt);
	}

	
	if (bio.length > 160) {
		throw new Error("Bio cannot be more than 160 characters.");
	}

	// if (username) {
	// 	const foundUsername = await UserDAO.findUserByUsername(username);

	// 	if (foundUsername) {
	// 		throw new Error("Username is already in use.");
	// 	}
	// }

	const updateUserInfo = await makeUser(user);

	const insertResult = await UserDAO.updateOneUser(updateUserInfo);
	const userView = {
		username: insertResult.value.username,
		firstName: insertResult.value.firstName,
		lastName: insertResult.value.lastName,
		bio: insertResult.value.bio,
	};

	return userView;
};

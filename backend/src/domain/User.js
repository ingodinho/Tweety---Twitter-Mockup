import UserDAO from "../db-access/users-dao.js";

export const makeUser = async ({
	_id,
	username,
	firstName,
	lastName,
	email,
	dob,
	profilePictureLink,
	bannerPictureLink,
	bio,
	passwordHash,
	passwordSalt,
	sixDigitCode,
	emailVerified,
	likedTweets,
	following,
	followedBy,
	createdAt,
}) => {
	if (!username || !email) {
		throw new Error("email and username cannot be empty.");
	}

	if (firstName.length < 2) {
		throw new Error("First name must be at least 2 characters.");
	}

	if (lastName.length < 2) {
		throw new Error("Last name must be at least 2 characters.");
	}

	if (username.length < 2) {
		throw new Error("username must be at least 2 characters.");
	}

	const emailre =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	if (!email.match(emailre)) {
		throw new Error("email not valid.");
	}

	dob = new Date(dob);
	if (!(dob instanceof Date && !isNaN(dob))) {
		throw new Error("Date of Birth must be a valid date format.");
	}

	return {
		_id,
		username,
		firstName,
		lastName,
		email,
		dob,
		profilePictureLink,
		bannerPictureLink,
		bio,
		passwordHash,
		passwordSalt,
		sixDigitCode,
		emailVerified,
		likedTweets,
		following,
		followedBy,
		createdAt,
	};
};

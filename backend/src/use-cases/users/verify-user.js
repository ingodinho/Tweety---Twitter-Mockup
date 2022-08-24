import UserDAO from "../../db-access/users-dao.js";

export const verifyUser = async ({ email, sixDigitCode }) => {
	const user = await UserDAO.findUserByEmail(email);
	if (!user) {
		console.log(user);
		return "User not found. Please enter valid e-mail address.";
	}

	const codeWasCorrect = user.sixDigitCode === sixDigitCode;
	if (!codeWasCorrect) {
		console.log(codeWasCorrect);
		return "Code incorrect. Please enter valid code";
	}

	const result = await UserDAO.findOneAndUpdateVerifiedStatus({
		userId: user._id,
		emailVerified: true,
	});

	return result.value.emailVerified;
};

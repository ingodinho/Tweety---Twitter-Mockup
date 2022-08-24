import { sendMail } from "../../utils/nodemailer/sendEmail.js";
import UserDAO from "../../db-access/users-dao.js";

export const sendAuthMail = async (userId) => {
	const user = await UserDAO.findUserById(userId);
	console.log(user);

	const sendMailResult = await sendMail({
		to: user.email,
		subject: "Tweety: Please verify your email address",
		message: `
        Hello ${user.firstName || user.username},

        Welcome to Tweety! To verify your email address, please enter your six  digit code as below:

        ${user.sixDigitCode}

		On the following page: https://tweetyfesecondedition.herokuapp.com/validation

        After that you will be able to login.

        Have fun tweeting!
        `,
	});

	if (!sendMailResult) {
		throw new Error("500 internal server error");
	}

	return sendMailResult;
};

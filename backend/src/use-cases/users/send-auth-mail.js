import { sendMail } from '../../utils/nodemailer/sendEmail.js';
import UserDAO from "../../db-access/users-dao.js";

export const sendAuthMail = async (userId) => {

    const user = await UserDAO.findUserById(userId);

    const sendMailResult = await sendMail({
        to: user.email,
        subject: "please sir verify your email address",
        message: `
        Hello ${user.firstName || user.username},

        thank you for joining Good Project community Sir.

        Please Sir, use this 6-digit verification code to verify your email:

        ${user.sixDigitCode}

        After that you will be on special member list.

        Thank you Sir.

        Ranjesh
        `
    })

    if (!sendMailResult) {
        throw new Error('500 internal server error');
    }

    return sendMailResult;
};
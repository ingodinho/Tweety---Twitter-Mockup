import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const GMAIL_ADRESS = process.env.GMAIL_ADRESS
const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export const sendMail = async ({ to, subject, message, html }) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: GMAIL_ADRESS,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: `Tweety Tankstelle 📧 <${GMAIL_ADRESS}>`,
            to,
            subject,
            message,
            html: html || message.replaceAll("\n", "<br/>")
        }

        const result = await transporter.sendMail(mailOptions);

        return result.accepted.includes(to);

    } catch (err) {
        return err;
    }
}

// return oAuth2Client
//     .getAccessToken()
//     .then(accessToken => {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
//                 user: GMAIL_ADRESS,
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken
//             }
//         })

//         return transporter.sendMail({
//             from: `Super Coders Pro 📧 <${GMAIL_ADRESS}>`,
//             to,
//             subject,
//             message,
//             html: html || message.replaceAll("\n", "<br/>")
//         })
//     }).then(sentMessageInfo => {
//         return sentMessageInfo.accepted.includes(to)
//     })
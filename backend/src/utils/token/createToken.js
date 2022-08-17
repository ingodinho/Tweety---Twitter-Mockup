import jwt from "jsonwebtoken";

const defaultDuration = 10 * 600000;
export const createToken = (user, duration = defaultDuration, tokenType = 'access') => {
    const initiatedAt = Math.floor(Date.now() / 1000);
    const expiresAt = initiatedAt + duration;

    const tokenPayload = {
        sub: user._id,
        iat: initiatedAt,
        exp: expiresAt,
        tokenType
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { algorithm: 'HS256' });
    return token;
};
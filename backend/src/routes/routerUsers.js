import express from 'express';
import multer from 'multer';
import fs from 'fs';
import util from 'util';
import { registerUser } from '../use-cases/users/register-user.js';
import { showAllUsers } from '../use-cases/users/show-all-users.js';
import { showUserProfile } from '../use-cases/users/show-user-profile.js';
import { loginUser } from '../use-cases/users/login-user.js';
import { makeDoAuthMiddleware } from '../auth/doAuthMiddleware.js';
import { refreshUserToken } from '../use-cases/users/refresh-user-token.js';
import { editUser } from '../use-cases/users/edit-user.js';
import { uploadFile, getFileStream } from '../utils/s3/s3-avatar.js';
import { resizeAvatar } from '../utils/s3/sharp.js';

const doAuthMiddlewareAccess = makeDoAuthMiddleware();
const doAuthMiddlewareRefresh = makeDoAuthMiddleware('refresh');

const avatarPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/avatarPictures");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname); //Appending extension
    },
});

const uploadAvatarImage = multer({ storage: avatarPicStorage }).single('avatarimage');

const unlinkFile = util.promisify(fs.unlink);

export const usersRouter = express.Router();

usersRouter.get('/allusers', async (_, res) => {
    try {
        const allUsers = await showAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
});

usersRouter.get('/profile', doAuthMiddlewareAccess, async (req, res) => {
    const userId = req.body.userId;
    try {
        const foundUser = await showUserProfile(userId);
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
});

usersRouter.post('/register', async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message || "500 internal server error" });
    }
});

usersRouter.post('/login', async (req, res) => {
    try {
        const tokens = await loginUser(req.body);
        res.status(200).json(tokens)
    } catch (err) {
        res.status(401).json({ message: err.message || "401 unauthorized" })
    }
});

usersRouter.post('/refreshtoken', doAuthMiddlewareRefresh, async (req, res) => {
    try {
        const userId = req.userClaims.sub;
        const accessToken = await refreshUserToken({ userId });
        res.status(200).json({ accessToken: accessToken });
    } catch (err) {
        res.status(401).json({ message: err.message || "401 unauthorized" })
    }
});

usersRouter.post('/edit', doAuthMiddlewareAccess, async (req, res) => {
    try {
        const userId = req.userClaims.sub;
        const updatedUser = await editUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json({ message: err.message || "401 unauthorized" })
    }
})

usersRouter.get('/avatarimage/:key', doAuthMiddlewareAccess, async (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

usersRouter.put('/avatarimage',
    doAuthMiddlewareAccess,
    uploadAvatarImage,
    async (req, res) => {
        try {
            const file = req.file;
            const originalFilePath = file.path;
            const newFilePath = await resizeAvatar(file);
            const result = await uploadFile(newFilePath, file);
            await unlinkFile(originalFilePath);
            await unlinkFile(newFilePath);
            res.status(201).send({ imagePath: `/avatarimage/${result.key}` });
        } catch (err) {
            res.status(500).json({ message: err.message || "500 internal server error" })
        }
    })
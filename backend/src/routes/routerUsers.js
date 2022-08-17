import express from 'express';
import multer from 'multer';
import { registerUser } from '../use-cases/users/register-user.js';
import { showAllUsers } from '../use-cases/users/show-all-users.js';
import { showUserProfile } from '../use-cases/users/show-user-profile.js';
import { loginUser } from '../use-cases/users/login-user.js';
import { makeDoAuthMiddleware } from '../auth/doAuthMiddleware.js';
import { refreshUserToken } from '../use-cases/users/refresh-user-token.js';
import { editUser } from '../use-cases/users/edit-user.js';

const doAuthMiddlewareAccess = makeDoAuthMiddleware();
const doAuthMiddlewareRefresh = makeDoAuthMiddleware('refresh');

const uploadAvatarImage = multer({ dest: 'uploads/avatarPictures' });

export const usersRouter = express.Router();

usersRouter.get('/allusers', async (_, res) => {
    try {
        const allUsers = await showAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
});

usersRouter.get('/profile/:userid', doAuthMiddlewareAccess, async (req, res) => {
    const userId = req.params.userId;
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

usersRouter.put('/avatarimage',
    doAuthMiddlewareAccess,
    uploadAvatarImage.single('avatarimage'),
    (req, res) => {
        const file = req.file;
        console.log(file);
        res.send('ok');
        // try {
        //     const avatarImage = req.file.filename;
        //     const userId = req.userClaims.sub;
        //     const response = await changeProfileAvatar({ userId, avatarImage });
        //     res.json(response);
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json({
        //         message: err.toString() || "Error uploading your gif as reply.",
        //     });
        // }
    })
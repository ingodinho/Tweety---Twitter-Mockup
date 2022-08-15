import express from 'express';
import { registerUser } from '../use-cases/users/register-user.js';
import { showAllUsers } from '../use-cases/users/show-all-users.js';

export const usersRouter = express.Router();

usersRouter.get('/allUsers', async (_, res) => {
    try {
        const allUsers = await showAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(404).json({ message: err.message || "404 not found" });
    }
});

// usersRouter.get('/user', async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const foundUser = await findUserById(userId);
//         res.status(200).json(foundUser);
//     } catch (err) {
//         res.status(404).json({ message: err.message || "404 not found" });
//     }
// });

usersRouter.post('/newUser', async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message || "500 internal server error" });
    }
})
import UserDAO from "../../db-access/users-dao.js";
import { makeUser } from "../../domain/User.js";

export const showUserProfile = async (userId) => {
    const foundUser = await UserDAO.findUserById(userId);
    if (!foundUser) {
        throw new Error("User not found");
    }

    const user = makeUser(foundUser);

    const posts = [] //PLATZHALTER FÜR findpostsbyuserid

    return {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureLink: user.profilePictureLink,
        likedTweets: user.likedTweets,
        following: user.following,
        followedBy: user.followedBy,
        createdAt: user.createdAt,
        userPosts: posts
    }
}
import UserDAO from "../../db-access/users-dao.js";

export const showUserProfile = async (userId) => {
	try {
		const user = await UserDAO.findUserById(userId);
		const posts = []; //PLATZHALTER FÜR findpostsbyuserid

		return {
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			profilePictureLink: user.profilePictureLink,
			bannerPictureLink: user.bannerPictureLink,
			likedTweets: user.likedTweets,
			following: user.following,
			followedBy: user.followedBy,
			createdAt: user.createdAt,
			dob: user.dob,
			bio: user.bio,
			userPosts: posts,
		};
	} catch (error) {
		throw new Error("User not found");
	}
};

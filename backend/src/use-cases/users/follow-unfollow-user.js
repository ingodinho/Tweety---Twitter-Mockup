import UsersDAO from "../../db-access/users-dao.js";

export const followUser = async ({ followUserId }, userId) => {
	const followUserResult = await UsersDAO.followUnfollowUser(
		userId,
		followUserId
	);
	const followedUserResult = await UsersDAO.followedUser(
		userId,
		followUserId
	);
	return {
		followUserResult: followUserResult.ok,
		followedUserResult: followUserResult.ok,
	};
};

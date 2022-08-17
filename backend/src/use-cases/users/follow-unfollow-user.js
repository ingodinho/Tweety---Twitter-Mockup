import UsersDAO from "../../db-access/users-dao.js";

export const followUser = async ({ userId, followUserId }) => {
    const followUserResult = await UsersDAO.followUnfollowUser(userId, followUserId);
    const followedUserResult = await UsersDAO.followedUser(userId, followUserId)
    return {followUserResult, followedUserResult}
}
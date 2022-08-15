import UserDAO from "../../db-access/users-dao.js";

export const showAllUsers = async () => {
    const usersArray = await UserDAO.findAllUsers();
    return usersArray;
}
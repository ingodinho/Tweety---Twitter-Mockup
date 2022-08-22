import SearchDAO from "../../db-access/search-dao.js";

export const topUsers = async () => {
    const usersSearch = await SearchDAO.searchTopUsers();
    const userResult = usersSearch.foundUsers.sort((a,b) =>{
        a.likedTweets.length - b.likedTweets.length
    })
    return {userResult};
}
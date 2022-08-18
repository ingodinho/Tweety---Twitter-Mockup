import UsersDAO from "../db-access/users-dao.js"
import { ObjectId } from 'mongodb';

export const expandTweetWithUserData = async (tweetArray) => {
    
    const userIds = tweetArray.map((tweet) => {
        return ObjectId(tweet.postedBy)
    })
    const userData = await UsersDAO.findUserData(userIds)

    const result = tweetArray.map((tweet)=>{
        const tweetUser = userData.find((user) => {
            return tweet.postedBy === user._id.toString()
        })
        return {...tweet, postedBy: tweetUser}
    })
    return result
}
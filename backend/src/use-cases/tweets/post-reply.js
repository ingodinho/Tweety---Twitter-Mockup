import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const postReply = async ({ content, userId, replyToId }) => {
    const reply = makeTweet(
        {
            content,
            postedBy: userId,
            postedAt: Date.now(),
            replyTo: replyToId,
            replies: [],
            likes: [],
            retweets: []
        }
    )
    const replyResult = await TweetsDAO.insertOneReply(reply);
    const replyId = replyResult.insertedId
    const result = await TweetsDAO.insertReplyIdToOrigin(replyToId, replyId)
    return {replyResult, result}
}
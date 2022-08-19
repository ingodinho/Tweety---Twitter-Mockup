import TweetsDAO from "../../db-access/tweets-dao.js";
import { makeTweet } from "../../domain/Tweet.js";

export const postReply = async (
	{ content, replyToId },
	userId,
	s3Key = null
) => {
	const reply = makeTweet({
		content,
		postedBy: userId,
		postedAt: Date.now(),
		replyTo: replyToId,
		replies: [],
		likes: [],
		retweets: [],
		imgLink: s3Key,
	});
	const replyResult = await TweetsDAO.insertOneReply(reply);
	const replyId = replyResult.insertedId;
	const result = await TweetsDAO.insertReplyIdToOrigin(replyToId, replyId);
	return { replyResult, result };
};

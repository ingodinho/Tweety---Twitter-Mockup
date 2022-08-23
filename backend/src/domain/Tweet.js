export const makeTweet = ({
	_id,
	postedBy,
	postedAt,
	lastEditedAt,
	replyTo,
	content,
	likes,
	retweets,
	imgLink,
	replies,
}) => {
	if (!postedBy) {
		throw new Error("posted by cannot be empty");
	}

	if (content.length > 280) {
		throw new Error("The maximum tweety length is 280 characters.");
	}

	if (content.length < 1) {
		throw new Error("The minimum tweety length is 1 character.");
	}

	return {
		_id,
		postedBy,
		postedAt,
		lastEditedAt,
		replyTo,
		content,
		likes,
		retweets,
		imgLink,
		replies,
	};
};

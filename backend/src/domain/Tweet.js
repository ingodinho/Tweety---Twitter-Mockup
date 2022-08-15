export const makeTweet = ({
    _id,
    postedBy,
    postedAt,
    content,
    likes,
    retweets,
    imgLink,
    replies,
}) => {
    if (!postedBy) {
        throw new Error("posted by cannot be empty");
    }


    return {
        _id,
        postedBy,
        postedAt,
        content,
        likes,
        retweets,
        imgLink,
        replies,
    };
}
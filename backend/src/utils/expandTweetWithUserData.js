import UsersDAO from "../db-access/users-dao.js";
import { ObjectId } from "mongodb";
import { generateSignedUrl } from "./s3/s3-signature.js";

export const expandTweetWithUserData = async (tweetArray) => {
  const userIds = tweetArray.map((tweet) => {
    return ObjectId(tweet.postedBy);
  });
  const userData = await UsersDAO.findUserData(userIds);
  const newUserData = await Promise.all(
    userData.map(async (user) => {
      const key = user.profilePictureLink;
      const link = await generateSignedUrl(key);
      user.profilePictureLink = link;
      return user;
    })
  );
  const result = tweetArray.map((tweet) => {
    const tweetUser = newUserData.find((user) => {
      return tweet.postedBy === user._id.toString();
    });
    return { ...tweet, postedBy: tweetUser };
  });
  return result;
};
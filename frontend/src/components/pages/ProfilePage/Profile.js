import {
  Banner,
  Bio,
  Date,
  EditProfile,
  FollowerStats,
  FollowerWrapper,
  HomeLink,
  Name,
  UserInfo,
  UserName,
  UserWrapper,
} from "./Profile.styling";
import { placeHolderUser } from "../../placeholder";
import Moment from "react-moment";
import UserPic from "../../../img/profileplaceholder.jpeg";
import ProfileTweets from "./ProfileTweets";
import NewTweetButton from "../../shared/NewTweetButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../utils/SharedStates";
import Tweet from "../../shared/Tweet/Tweet";
import {useParams} from "react-router-dom";

const Profile = () => {
  const userData = useRecoilValue(loggedInUser);
  console.log(userData);
  const {id: userId} = useParams();
  console.log(userId);
  const [tweets, setTweets] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const response = await axios.get(
        apiLink + `/tweets/user/${userData._id}`
      );
      setTweets(response.data);
    };
    const getUserInfo = async () => {
      const response = await axios.get(apiLink + `/users/profile/${userId}`, {
        headers: {
          token: "JWT " + userData.accessToken,
        },
      });
      setUserInfo(response.data);
    };
    getTweets();
    getUserInfo();
  }, [userData]);

  return (
    <>
      <header>
        <HomeLink to={"/home"}>BACK</HomeLink>
        <Banner src={placeHolderUser.bannerLink} alt="Banner" />
      </header>
      <UserWrapper>
        <UserInfo>
          <img src={UserPic} alt="User" />
          <EditProfile to={`/profile/${userData._id}/edit`}>
            Edit Profile
          </EditProfile>
        </UserInfo>
        <div>
          <Name>
            {userInfo.firstName} {userInfo.lastName}
          </Name>
          <UserName>@{userInfo.username}</UserName>
          <Bio>{userInfo?.bio}</Bio>
        </div>
        <div>
          <Date>
            Joined{" "}
            <Moment format={"MMMM YYYY"}>{placeHolderUser.createdAt}</Moment>
          </Date>
        </div>
        <FollowerWrapper>
          <FollowerStats>
            <p>{placeHolderUser.following.length}</p>
            <span>Following</span>
          </FollowerStats>
          <FollowerStats>
            <p>{placeHolderUser.followedBy.length}</p>
            <span>Followers</span>
          </FollowerStats>
        </FollowerWrapper>
      </UserWrapper>
      <ProfileTweets userId={userData._id} />
      {tweets
        .sort((a, b) => b.postedAt - a.postedAt)
        .map((tweet) => (
          <Tweet key={tweet._id} {...tweet} />
        ))}
      <NewTweetButton />
    </>
  );
};

export default Profile;

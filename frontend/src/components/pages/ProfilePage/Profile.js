import {
  Banner,
  Bio,
  Date,
  EditProfile,
  FollowerStats,
  FollowerWrapper,
  Menu,
  Name,
  NavButtons,
  TweetWrapper,
  UserInfo,
  UserName,
  UserWrapper,
} from "./Profile.styling";
import userPlaceHolderImg from "../../../img/profileplaceholder.png";
import Moment from "react-moment";
import NewTweetButton from "../../shared/NewTweetButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "../../utils/apiLink";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleModal, loggedInUser, modalId } from "../../utils/SharedStates";
import Tweet from "../../shared/Tweet/Tweet";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import BackButton from "../../shared/BackButton";
import bannerPlaceHolder from "../../../img/bannerplaceholder.png";
import { ButtonFollow } from "../../../styles/Buttons";

const Profile = () => {
  const navigator = useNavigate();
  const userData = useRecoilValue(loggedInUser);
  const { id: profileId } = useParams();
  const [following, setFollowing] = useState(false);
  const myProfile = profileId === userData?.userId;
  const [tweets, setTweets] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [currentNav, setCurrentNav] = useState("userTweets");
  const [isLoading, setIsLoading] = useState(true);
  const setShowModal = useSetRecoilState(handleModal);
  const setIdModal = useSetRecoilState(modalId);

  const axiosOptions = {
    headers: {
      token: "JWT " + userData?.accessToken,
    },
  };

  useEffect(() => {
    if (!userData) return;
    const link =
      currentNav === "userTweets"
        ? apiLink + `/tweets/user/${profileId}`
        : currentNav === "likedTweets"
        ? apiLink + `/tweets/liked/${profileId}`
        : null;
    if (!link) return;
    const getTweets = async () => {
      const response = await axios.get(link, axiosOptions);
      currentNav === "userTweets"
        ? setTweets(response.data)
        : setTweets(response.data.result);
    };

    const getUserInfo = async () => {
      const response = await axios.get(
        apiLink + `/users/profile/${profileId}`,
        axiosOptions
      );
      setUserInfo(response.data);
      setFollowing(response.data.followedBy.includes(userData.userId));
      setIsLoading(false);
    };
    getTweets();
    getUserInfo();
  }, [userData, currentNav, profileId]);

  const handleFollow = async () => {
    const data = {
      userId: userData.userId,
      followUserId: profileId,
    };
    const response = await axios.put(apiLink + "/users/follow", data);
    setFollowing((prev) => !prev);
  };

  const showUserTweets = () => {
    setCurrentNav("userTweets");
  };

  const showLikedTweets = () => {
    setCurrentNav("likedTweets");
  };

  const toFollowerList = (defaultnav) => {
    navigator(`/followerlist/${profileId}/${defaultnav}`);
  };

  const showImageModal = () => {
    setShowModal(true);
    setIdModal({ profileId });
  };

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <header>
          <BackButton path={"/home"} />
          <Banner
            src={userInfo.bannerPictureLink || bannerPlaceHolder}
            alt="Banner"
          />
        </header>
        <UserWrapper>
          <UserInfo>
            <img
              src={userInfo.profilePictureLink || userPlaceHolderImg}
              onClick={() => showImageModal()}
              alt="User"
            />
            {myProfile && (
              <EditProfile to={`/profile/${userData.userId}/edit`}>
                Edit Profile
              </EditProfile>
            )}
            {!myProfile && (
              <ButtonFollow
                onClick={handleFollow}
                following={following}
                size={"big"}
              >
                {following ? "Following" : "Follow"}
              </ButtonFollow>
            )}
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
              Joined <Moment format={"MMMM YYYY"}>{userInfo.createdAt}</Moment>
            </Date>
          </div>
          <FollowerWrapper>
            <FollowerStats onClick={() => toFollowerList("following")}>
              <p>{userInfo.following?.length}</p>
              <span>Following</span>
            </FollowerStats>
            <FollowerStats onClick={() => toFollowerList("followers")}>
              <p>{userInfo.followedBy?.length}</p>
              <span>
                {userInfo.followedBy?.length === 1 ? "Follower" : "Followers"}
              </span>
            </FollowerStats>
          </FollowerWrapper>
        </UserWrapper>
        <Menu>
          <NavButtons
            active={currentNav === "userTweets"}
            onClick={() => showUserTweets()}
          >
            Tweets
          </NavButtons>
          <NavButtons
            active={currentNav === "likedTweets"}
            onClick={() => showLikedTweets()}
          >
            Likes
          </NavButtons>
        </Menu>
        <TweetWrapper>
          {tweets.map((tweet) => (
            <Tweet key={tweet._id} {...tweet} />
          ))}
          <NewTweetButton />
        </TweetWrapper>
      </>
    );
  }
};

export default Profile;

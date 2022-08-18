import {
    Banner,
    Bio,
    Date,
    EditProfile, Follow,
    FollowerStats,
    FollowerWrapper,
    HomeLink,
    Name,
    UserInfo,
    UserName,
    UserWrapper,
} from "./Profile.styling";
import {placeHolderUser} from "../../placeholder";
import Moment from "react-moment";
import UserPic from "../../../img/profileplaceholder.jpeg";
import ProfileTweets from "./ProfileTweets";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import Tweet from "../../shared/Tweet/Tweet";
import {useParams} from "react-router-dom";

const Profile = () => {
    const userData = useRecoilValue(loggedInUser);
    const {id: profileId} = useParams();
    const [following, setFollowing] = useState(false);
    const myProfile = profileId === userData._id;
    const [tweets, setTweets] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            const response = await axios.get(
                apiLink + `/tweets/user/${profileId}`
            );
            setTweets(response.data);
        };
        const getUserInfo = async () => {
            const response = await axios.get(apiLink + `/users/profile/${profileId}`, {
                headers: {
                    token: "JWT " + userData.accessToken,
                },
            });
            setUserInfo(response.data);
            setFollowing(response.data.followedBy.includes(userData._id));
        };
        getTweets();
        getUserInfo();
    }, [userData]);

    const handleFollow = async () => {
        const data = {
            userId: userData._id,
            followUserId: profileId
        }
        const response = await axios.put(apiLink + '/users/follow', data);
        setFollowing(prev => !prev);
    }

    return (
        <>
            <header>
                <HomeLink to={"/home"}>BACK</HomeLink>
                <Banner src={placeHolderUser.bannerLink} alt="Banner"/>
            </header>
            <UserWrapper>
                <UserInfo>
                    <img src={UserPic} alt="User"/>
                    {myProfile && <EditProfile to={`/profile/${userData._id}/edit`}>
                        Edit Profile
                    </EditProfile>}
                    {!myProfile &&
                        <Follow onClick={handleFollow} following={following}>{following ? "Following" : 'Follow'}</Follow>
                    }
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
                        <Moment format={"MMMM YYYY"}>{userInfo.createdAt}</Moment>
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
            <ProfileTweets userId={userData._id}/>
            {tweets
                .map((tweet) => (
                    <Tweet key={tweet._id} {...tweet} />
                ))}
            <NewTweetButton/>
        </>
    );
};

export default Profile;

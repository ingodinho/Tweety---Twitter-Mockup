import {
    Banner,
    Bio,
    Date,
    EditProfile, Follow,
    FollowerStats,
    FollowerWrapper,
    HomeLink, Menu,
    Name, NavButtons,
    UserInfo,
    UserName,
    UserWrapper,
} from "./Profile.styling";
import userPlaceHolderImg from '../../../img/profileplaceholder.png';
import Moment from "react-moment";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import Tweet from "../../shared/Tweet/Tweet";
import {useParams} from "react-router-dom";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";

const Profile = () => {
    const userData = useRecoilValue(loggedInUser);
    const {id: profileId} = useParams();
    const [following, setFollowing] = useState(false);
    const myProfile = profileId === userData._id;
    const [tweets, setTweets] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [currentNav, setCurrentNav] = useState('userTweets');
    const [isLoading, setIsLoading] = useState(true);

    const fetchSettings = {
        headers: {
            token: "JWT " + userData.accessToken,
        }
    }

    useEffect(() => {
        if (!userData) return;
        const link = currentNav === 'userTweets' ? apiLink + `/tweets/user/${profileId}`
            : currentNav === 'likedTweets' ? apiLink + `/tweets/liked/${profileId}` : null;
        if (!link) return;
        const getTweets = async () => {
            const response = await axios.get(link);
            currentNav === 'userTweets' ? setTweets(response.data) : setTweets(response.data.result);
        };

        const getUserInfo = async () => {
            const response = await axios.get(apiLink + `/users/profile/${profileId}`,
                fetchSettings
            );
            setUserInfo(response.data);
            setFollowing(response.data.followedBy.includes(userData._id));
            setIsLoading(false);
        };
        getTweets();
        getUserInfo();
    }, [userData, currentNav]);

    const handleFollow = async () => {
        const data = {
            userId: userData._id,
            followUserId: profileId
        }
        const response = await axios.put(apiLink + '/users/follow', data);
        setFollowing(prev => !prev);
    }

    const showUserTweets = () => {
        setCurrentNav('userTweets');
    }

    const showLikedTweets = () => {
        setCurrentNav('likedTweets')
    }

    if (isLoading) {
        return <LoadingPage/>
    } else {

        return (
            <>
                <header>
                    <HomeLink to={"/home"}>BACK</HomeLink>
                    <Banner src={userInfo.bannerPictureLink} alt="Banner"/>
                </header>
                <UserWrapper>
                    <UserInfo>
                        <img src={userInfo.profilePictureLink || userPlaceHolderImg} alt="User"/>
                        {myProfile && <EditProfile to={`/profile/${userData._id}/edit`}>
                            Edit Profile
                        </EditProfile>}
                        {!myProfile &&
                            <Follow onClick={handleFollow}
                                    following={following}>{following ? "Following" : 'Follow'}</Follow>
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
                            <p>{userInfo.following?.length}</p>
                            <span>Following</span>
                        </FollowerStats>
                        <FollowerStats>
                            <p>{userInfo.followedBy?.length}</p>
                            <span>{userInfo.followedBy?.length === 1 ? 'Follower' : 'Followers'}</span>
                        </FollowerStats>
                    </FollowerWrapper>
                </UserWrapper>
                <Menu>
                    <NavButtons active={currentNav === 'userTweets'}
                                onClick={() => showUserTweets()}>Tweets</NavButtons>
                    <NavButtons active={currentNav === 'likedTweets'}
                                onClick={() => showLikedTweets()}>Likes</NavButtons>
                </Menu>
                {tweets
                    .map((tweet) => (
                        <Tweet key={tweet._id} {...tweet} />
                    ))}
                <NewTweetButton/>
            </>
        );
    }
};

export default Profile;
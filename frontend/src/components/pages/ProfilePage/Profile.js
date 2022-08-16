import {
    Banner,
    Bio,
    Date,
    EditProfile, FollowerStats,
    FollowerWrapper,
    HomeLink,
    Name,
    UserInfo,
    UserName,
    UserWrapper
} from "./Profile.styling";
import {placeHolderUser} from "../../placeholder";
import Moment from "react-moment";
import UserPic from '../../../img/profileplaceholder.jpeg';
import ProfileTweets from "./ProfileTweets";
import NewTweetButton from "../../shared/NewTweetButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import Tweet from "../../shared/Tweet/Tweet";

const Profile = () => {

    const userData = useRecoilValue(loggedInUser);
    const [tweets, setTweets] = useState([]);

    useEffect(()=> {
            const getTweets = async () => {
                // testid: 62fbb45e6b1c463bb8a5a2da
                const response = await axios.get(apiLink + `/tweets/user/${userData._id}`);
                setTweets(response.data);
            }
            getTweets();
    },[])

    return (
        <>
            <header>
                <HomeLink to={'/home'}>BACK</HomeLink>
                <Banner src={placeHolderUser.bannerLink} alt="Banner"/>
            </header>
            <UserWrapper>
                <UserInfo>
                    <img src={UserPic} alt="User"/>
                    <EditProfile to={'/'}>Edit Profile</EditProfile>
                </UserInfo>
                <div>
                    <Name>{placeHolderUser.firstName} {placeHolderUser.lastName}</Name>
                    <UserName>@{placeHolderUser.userName}</UserName>
                    <Bio>Hier darf dann irgendwann mal eine UserBio auftauchen</Bio>
                </div>
                <div>
                    <Date>Joined <Moment format={'MMMM YYYY'}>{placeHolderUser.createdAt}</Moment></Date>
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
            {tweets.sort((a,b) => b.postedAt - a.postedAt).map((tweet) =>
                <Tweet
                    key={tweet._id}
                    {...tweet}
                />
            )}
            <NewTweetButton/>
        </>
    )
}

export default Profile;
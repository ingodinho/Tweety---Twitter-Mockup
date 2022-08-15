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

const Profile = () => {
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
            <ProfileTweets userId={placeHolderUser.userName}/>
        </>
    )
}

export default Profile;
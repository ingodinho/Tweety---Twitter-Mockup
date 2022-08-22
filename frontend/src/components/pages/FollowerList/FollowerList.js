import BackButton from "../../shared/BackButton";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import UserCard from "../../shared/UserCard/UserCard";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import {Navbar, NavItems, UserHeader, Wrapper} from "./FollowerList.styling";

const FollowerList = () => {
    const userData = useRecoilValue(loggedInUser);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {id: profileId, defaultnav} = useParams();
    const [currentNav, setCurrentNav] = useState(defaultnav);
    const [users, setUsers] = useState([]);

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        if (!userData) return;
        const getList = async () => {
            const endPoint = currentNav === 'followers' ? `/users/followedby/${profileId}` : `/users/following/${profileId}`;
            // const endPoint = '/users/allusers'
            const [followerResponse, userInfoResponse] = await Promise.all(
                [
                    axios.get(apiLink + endPoint, axiosOptions),
                    axios.get(apiLink + `/users/profileshort`, axiosOptions)
            ]);
            setUsers(followerResponse.data);
            setUserInfo(userInfoResponse.data);
            setIsLoading(false);
        }
        getList();
    }, [userData, currentNav])

    if (isLoading) {
        return <LoadingPage/>
    }

    return (
        <>
            <BackButton/>
            <Wrapper>
                <UserHeader>
                    <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                    <span>@{userInfo.username}</span>
                </UserHeader>
                <Navbar className="navbar">
                    <NavItems active={currentNav === 'following'}
                              onClick={() => setCurrentNav('following')}>Following</NavItems>
                    <NavItems active={currentNav === 'followers'}
                              onClick={() => setCurrentNav('followers')}>Followers</NavItems>
                </Navbar>
                <div className="Tweetwrapper">
                    {users.map(user =>
                        <UserCard
                            key={user._id}
                            {...user}
                        />
                    )}
                </div>
            </Wrapper>
        </>
    )
}

export default FollowerList;
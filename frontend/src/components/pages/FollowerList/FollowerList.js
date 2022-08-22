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
    const [isLoading, setIsLoading] = useState(true);
    const {id: profileId, defaultnav} = useParams();
    const [currentNav, setCurrentNav] = useState(defaultnav);
    const [users, setUsers] = useState([]);

    const axiosOptions = {
        headers: {
            accessToken: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        if (!userData) return;
        const getList = async () => {
            const endPoint = currentNav === 'followers' ? `/users/allusers` : `/users/allusers`;
            const response = await axios.get(apiLink + endPoint, axiosOptions);
            setUsers(response.data);
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
                    <h4>Fullname</h4>
                    <span>@username</span>
                    <p>UserBio</p>
                </UserHeader>
                <Navbar className="navbar">
                    <NavItems active={currentNav === 'followers'}
                              onClick={() => setCurrentNav('followers')}>Followers</NavItems>
                    <NavItems active={currentNav === 'following'}
                              onClick={() => setCurrentNav('following')}>Following</NavItems>
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
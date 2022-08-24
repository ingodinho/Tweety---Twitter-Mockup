import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import ProfilePic from "../../shared/ProfilePic";
import styled from "styled-components";


const MessageUserCard = ({socketId, userId}) => {

    const userData = useRecoilValue(loggedInUser);
    const [userName, setUsername] = useState('');
    const [selectedUser, setSelectedUser] = useRecoilState(messageSelectedUser);

    const active = userId === selectedUser?.userId;

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(()=> {
        if(!userData) return;
        const getUserName = async () => {
            const response = await axios.get(apiLink + `/users/profile/${userId}`,axiosOptions);
            setUsername(response.data);
        }
        getUserName();
    },[userId])


    const selectUser = () => {
        setSelectedUser({socketId, username: userName.username, userId});
    }

    return (
        <Wrapper onClick={selectUser}>
            <ProfilePic src={userName.profilePictureLink} size={'big'} nolink={true} active={active}/>
            <UserName>{userName.username ? userName.username : 'General'}</UserName>
        </Wrapper>
    )
}

export default MessageUserCard;

const Wrapper = styled.article`
  font-size: 1.2rem;
  flex-basis: 7rem;
`

const UserName = styled.p`
  margin-top: 0.5rem;
  text-align: center;
`
import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import ProfilePic from "../../shared/ProfilePic";
import styled from "styled-components";

const MessageUserCard = ({socketId, userId, socket, setMessages}) => {

    const userData = useRecoilValue(loggedInUser);
    const [userInfo, setUserInfo] = useState('');
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
            setUserInfo(response.data);
        }
        getUserName();
    },[userId])


    const selectUser = async () => {
        socket.emit('select_user', {
            userId: userData.userId,
            to: userInfo._id,
            prevRoom: selectedUser ? userData.userId+selectedUser.userId : 'general'
        })
        setSelectedUser({socketId, username: userInfo.username, userId});
        const response = await axios.get(apiLink + '/messages/private/' + userData.userId + userInfo._id);
        console.log(response);
        setMessages(response.data);
    }

    return (
        <Wrapper onClick={selectUser}>
            <ProfilePic src={userInfo.profilePictureLink} size={'big'} nolink={true} active={active}/>
            <UserName>{userInfo.username ? userInfo.username : 'General'}</UserName>
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
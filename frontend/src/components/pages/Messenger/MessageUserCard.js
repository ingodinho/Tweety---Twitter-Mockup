import {useRecoilValue, useSetRecoilState} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import {useEffect, useState} from "react";
import app from "../../../App";
import {apiLink} from "../../utils/apiLink";
import axios from "axios";
import ProfilePic from "../../shared/ProfilePic";


const MessageUserCard = ({socketId, userId, socket}) => {

    const userData = useRecoilValue(loggedInUser);
    const [userName, setUsername] = useState('')
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

    const setSelectedUser = useSetRecoilState(messageSelectedUser);
    const selectUser = () => {
        setSelectedUser({socketId, userName, userId});
    }

    return (
        <div onClick={selectUser}>
            <ProfilePic src={userName.profilePictureLink} size={'big'}/>
            <p>{userName.username}</p>
            <p>{userId}</p>
            <p>{socketId}</p>
        </div>
    )
}

export default MessageUserCard;
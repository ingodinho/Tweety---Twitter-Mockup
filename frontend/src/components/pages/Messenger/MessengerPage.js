import {useState, useEffect, useRef} from 'react';
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessengerHeader from "./MessengerHeader";
import socketIO from "socket.io-client";
import {apiLink} from "../../utils/apiLink";
import HomeHeader from "../Home/HomeHeader";
import axios from "axios";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";

export default function MessengerPage() {

    // const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(socketIO(apiLink, {autoConnect: false}));
    socket.onAny((event, ...args) => {
        console.log(event, args)
    });
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null)
    const userData = useRecoilValue(loggedInUser);
    const userId = userData.userId;

    const axiosOptions = {
        headers: {
            token: 'JWT ' + userData?.accessToken
        }
    }

    useEffect(() => {
        if (!userData) return;
        socket.auth = {userId: userData.userId};
        socket.connect();
        // const getUserPicture = async () => {
        //     const response = await axios.get(apiLink + '/users/profileshort', axiosOptions);
        //     setUserProfilePicture(response.data.profilePictureLink);
        //     setIsLoading(false);
        // }
        // getUserPicture();

        return () => {
            socket.disconnect();
        }
    }, [userData]);

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            setMessages([...messages, data])
        });
    }, [socket, messages]);

    useEffect(() => {
        socket.on('private_message', (data) => {
            console.log(data);
            setMessages([...messages, data]);
        })
    }, [socket, messages]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    let typingTimeout;

    useEffect(() => {
        socket.on('typingResponse', (data) => {
            setTypingStatus(data);
            if(typingTimeout) {
                clearTimeout(typingTimeout);
            }
            typingTimeout = setTimeout(()=> {
                setTypingStatus('');
            },3000);
        });
    }, [socket])
    // if(isLoading) {
    //     return <LoadingPage/>
    // }
    return (
        <div>
            <HomeHeader userProfilePicture={userProfilePicture}/>
            <MessengerHeader socket={socket}/>
            <div>
                <Messages
                    messages={messages}
                    typingStatus={typingStatus}

                />
                <MessageInput
                    socket={socket}
                    userId={userId}
                    lastMessageRef={lastMessageRef}
                />
            </div>
        </div>
    );
}
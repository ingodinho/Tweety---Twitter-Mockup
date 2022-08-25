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

export default function MessengerPage() {

    const [socket, setSocket] = useState(socketIO(apiLink, {autoConnect: false}));
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null)
    const userData = useRecoilValue(loggedInUser);
    const userId = userData.userId;

    useEffect(() => {
        if (!userData) return;
        socket.auth = {userId: userData.userId};
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, [userData]);

    useEffect(() => {
        socket.on('private_message', (data) => {
            setMessages([...messages, data]);
        })
    }, [socket, messages]);

    useEffect(() => {
        const getInitialMessages = async () => {
            const response = await axios.get(apiLink + '/messages/private/general');
            setMessages(response.data);
        }
        getInitialMessages()
    },[])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    let typingTimeout;

    useEffect(() => {
        socket.on('typingResponse', (data) => {
            setTypingStatus(data);
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            typingTimeout = setTimeout(() => {
                setTypingStatus('');
            }, 3000);
        });
    }, [socket])

    return (
        <div>
            <HomeHeader nouserpic={true}/>
            <MessengerHeader socket={socket} setMessages={setMessages}/>
            <div>
                <Messages
                    messages={messages}
                    typingStatus={typingStatus}
                    setMessages={setMessages}
                    lastMessageRef={lastMessageRef}
                />
                <MessageInput
                    socket={socket}
                    userId={userId}
                />
            </div>
        </div>
    );
}
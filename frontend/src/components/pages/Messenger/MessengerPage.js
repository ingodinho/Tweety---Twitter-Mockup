import {useState, useEffect, useRef} from 'react';
import {useRecoilValue} from "recoil";
import {loggedInUser, socketConnection} from "../../utils/SharedStates";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessengerSide from "./MessengerSide";
import socketIO from "socket.io-client";
import {apiLink} from "../../utils/apiLink";

export default function MessengerPage({}) {

    const [socket, setSocket] = useState(socketIO(apiLink, {autoConnect: false}));
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null)
    const userData = useRecoilValue(loggedInUser);
    const userId = userData.userId;

    useEffect(() => {
        if (!userData) return;
        console.log('durchlauf')
        socket.auth = {userId: userData.userId};
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, [userData, messages]);


    useEffect(() => {
        socket.on('messageResponse', (data) => {
            setMessages([...messages, data])
        });
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

    return (
        <div>
            <MessengerSide socket={socket}/>
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
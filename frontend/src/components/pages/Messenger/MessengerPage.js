import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInUser } from "../../utils/SharedStates";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessengerSide from "./MessengerSide";

export default function MessengerPage({ socket }) {
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null)
    const userData = useRecoilValue(loggedInUser);
    const userId = userData.userId



        useEffect(() => {
            socket.on('messageResponse', (data) => setMessages([...messages, data]));
          }, [socket, messages]);

        useEffect(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth'})
        }, [messages])

        useEffect(() => {
            socket.on('typingResponse', (data) => setTypingStatus(data))
        }, [socket])
    return (
      <div>
        <MessengerSide socket={socket} />
          <div>
              <Messages
              messages={messages}
              typingStatus={typingStatus}
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
import {useState, useEffect} from 'react';
import './messenger.css'
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import axios from "axios";

const MessageInput = ({userId, socket, lastMessageRef}) => {
    console.log('socket oben', socket);
    const userData = useRecoilValue(loggedInUser);
    const selectedUser = useRecoilValue(messageSelectedUser);

    const [message, setMessage] = useState("")
    const [userName, setUserName] = useState('') //MUSS BEIM LADEN MIT DEM RICHTIGEN USERNAMEN GEFÜLLT WERDEN

    const axiosOptions = {
        headers: {
            token: `JWT ` + userData?.accessToken
        }
    }

    useEffect(() => {
        if (!userData) return;
        const getUserName = async () => {
            const response = await axios.get(apiLink + '/users/profileshort', axiosOptions);
            setUserName(response.data.username);
        }
        getUserName();
    }, [userData])

    const handleTyping = () => {
        socket.emit('typing', `${userName} is typing...`)
    }

    console.log(message);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('innerhalb von if');
            console.log(socket);
            socket.emit('message', {
                text: message,
                name: userName,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                userID: userId
            });
            // socket.emit('private_message', {
            //     text: message,
            //     to: selectedUser.userId,
            //     id: `${socket.id}${Math.random()}`,
            //     socketID: socket.id,
            //     userID: userId
            // })
        }
        setMessage("")
    }

    return (
        <div className="chat__footer" ref={lastMessageRef}>
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
}

export default MessageInput;
import {useState, useEffect} from 'react';
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import axios from "axios";
import {InputField, InputForm, MessageFooter} from "./MessageInput.styles";
import {ButtonSmall} from "../../../styles/Buttons";

const MessageInput = ({userId, socket, lastMessageRef}) => {
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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            if (selectedUser === null) {
                socket.emit('message', {
                    content: message,
                    name: userName,
                    messageId: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    userId: userId,
                    from: userId,
                    time: Date.now(),
                });
            } else {
                socket.emit('private_message',{
                    content: message,
                    to: selectedUser.userId,
                    messageId: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    userId: userId,
                    time: Date.now(),
                })
            }
        }
        setMessage('');
    }

    return (
        <MessageFooter ref={lastMessageRef}>
            <InputForm className="form" onSubmit={handleSendMessage}>
                <InputField
                    type="text"
                    placeholder="Write message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <ButtonSmall>Send</ButtonSmall>
            </InputForm>
        </MessageFooter>
    );
}

export default MessageInput;
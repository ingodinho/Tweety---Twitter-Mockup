import {useState, useEffect} from 'react';
import {apiLink} from "../../utils/apiLink";
import {useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import axios from "axios";
import {InputField, InputForm, MessageFooter} from "./MessageInput.styles";
import {ButtonSmall} from "../../../styles/Buttons";

const MessageInput = ({userId, socket}) => {
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
        let newMessage;
        e.preventDefault();
        if (message.trim()) {

            newMessage = {
                content: message,
                to: selectedUser?.userId ? selectedUser.userId : 'general',
                messageId: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                userId: userId,
                time: Date.now(),
            }

            socket.emit('private_message', newMessage);
        }
        setMessage('');
    }

    return (
        <MessageFooter>
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
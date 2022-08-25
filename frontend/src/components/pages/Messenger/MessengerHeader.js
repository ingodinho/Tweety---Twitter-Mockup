import {useEffect, useState} from "react";
import MessageUserCard from "./MessageUserCard";
import {useRecoilValue} from "recoil";
import {messageSelectedUser} from "../../utils/SharedStates";
import {ShowSelectedUser, UsersContainer, UsersHeadline, Wrapper} from "./MessengerHeader.styles";
import GeneralUserCard from "./GeneralUserCard";
import axios from "axios";

const MessengerHeader = ({socket, setMessages}) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const selectedUser = useRecoilValue(messageSelectedUser);

    socket.on('userConnectionResponse', (data) => setActiveUsers(data));

    return (
        <Wrapper>
            <UsersHeadline>Online User</UsersHeadline>
            <UsersContainer>
                <GeneralUserCard
                    socket={socket}
                    setMessages={setMessages}
                />
                {activeUsers.map(user =>
                    <MessageUserCard
                        key={user.socketId}
                        {...user}
                        socket={socket}
                        setMessages={setMessages}
                    />)}
            </UsersContainer>
            <ShowSelectedUser>{selectedUser?.username ? selectedUser.username : 'General'}</ShowSelectedUser>
        </Wrapper>
    );
};

export default MessengerHeader;
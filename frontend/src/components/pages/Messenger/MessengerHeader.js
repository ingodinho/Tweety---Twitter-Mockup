import {useState} from "react";
import MessageUserCard from "./MessageUserCard";
import {useRecoilValue} from "recoil";
import {messageSelectedUser} from "../../utils/SharedStates";
import {ShowSelectedUser, UsersContainer, UsersHeadline, Wrapper} from "./MessengerHeader.styles";
import GeneralUserCard from "./GeneralUserCard";

const MessengerHeader = ({socket}) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const selectedUser = useRecoilValue(messageSelectedUser);

    socket.on('userConnectionResponse', (data) => setActiveUsers(data));

    return (
        <Wrapper>
            <UsersHeadline>User</UsersHeadline>
            <UsersContainer>
                <GeneralUserCard/>
                {activeUsers.map(user =>
                    <MessageUserCard
                        key={user.socketId}
                        {...user}
                        socket={socket}
                    />)}
            </UsersContainer>
            <ShowSelectedUser>{selectedUser?.username ? selectedUser.username : 'General'}</ShowSelectedUser>
        </Wrapper>
    );
};

export default MessengerHeader;
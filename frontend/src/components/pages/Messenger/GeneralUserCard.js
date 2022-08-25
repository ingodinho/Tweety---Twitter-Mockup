import {useRecoilState, useRecoilValue} from "recoil";
import {loggedInUser, messageSelectedUser} from "../../utils/SharedStates";
import ProfilePic from "../../shared/ProfilePic";
import styled from "styled-components";
import GroupChatIcon from '../../../img/group-chat.png';
import axios from "axios";
import {apiLink} from "../../utils/apiLink";

const GeneralUserCard = ({socket, setMessages}) => {

    const userData = useRecoilValue(loggedInUser);
    const [selectedUser, setSelectedUser] = useRecoilState(messageSelectedUser);

    const selectUser = async () => {
        socket.emit('select_user', {
            userId: userData.userId,
            to: 'general',
            prevRoom: selectedUser ? userData.userId+selectedUser.userId : 'general'
        })
        setSelectedUser(null);
        const response = await axios.get(apiLink + '/messages/private/' + 'general');
        setMessages(response.data);
    }

    return (
        <Wrapper onClick={selectUser}>
            <ProfilePic size={'big'} nolink={true} active={selectedUser === null} src={GroupChatIcon}/>
            <UserName>General</UserName>
        </Wrapper>
    )
}

export default GeneralUserCard;

const Wrapper = styled.article`
  font-size: 1.2rem;
  flex-basis: 7rem;
`

const UserName = styled.p`
  margin-top: 0.5rem;
  text-align: center;
`
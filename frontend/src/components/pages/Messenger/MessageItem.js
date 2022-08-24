import Moment from "react-moment";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";

const MessageItem = ({content, from, messageId, username, time}) => {
    const userData = useRecoilValue(loggedInUser);
    const sender = userData?.userId === from;

    return (
        <Wrapper>
            <SenderTimeContainer sender={sender}>
                <p>{sender ? 'You' : username}</p>
                <p><Moment format={'HH:MM DD.MM'}>{time}</Moment></p>
            </SenderTimeContainer>
            <MessageBubble sender={sender}>
                <p>{content}</p>
            </MessageBubble>
        </Wrapper>
    )
}

export default MessageItem;

const Wrapper = styled.article`
    margin-bottom: 1rem;
`

const SenderTimeContainer = styled.div`
  display: flex;
  justify-content: ${p => p.sender ? 'end': 'start'};
  gap: 1rem;
`

const MessageBubble = styled.div`
  background-color: ${p => p.sender ? 'var(--clr-text-link)' : 'var(--clr-text-grey)'};
  max-width: 300px;
  padding: 1rem;
  border-radius: 10px;
  margin-left: ${p => p.sender ? 'auto' : 0};
  font-size: 1.6rem;
  color: var(--clr-text-white);
`
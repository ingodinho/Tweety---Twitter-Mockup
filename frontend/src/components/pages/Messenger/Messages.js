import MessageItem from "./MessageItem";
import styled from "styled-components";

const Messages = ({messages, typingStatus}) => {

    return (
        <>
            <MessageContainer>
                {messages.map((message) =>
                    (
                     <MessageItem
                        key={message.messageId}
                        {...message}
                     />
                    )
                )}
                <IsTyping>
                    <p>{typingStatus}</p>
                </IsTyping>
            </MessageContainer>
        </>
    );
};

export default Messages;

const MessageContainer = styled.div`
  margin-bottom: 10rem;
  padding: 0 1rem;
`

const IsTyping = styled.div`
  font-size: 1.3rem;
  font-style: italic;
`
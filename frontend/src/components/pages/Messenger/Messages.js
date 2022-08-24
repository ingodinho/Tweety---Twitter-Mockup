import {useNavigate} from 'react-router-dom';
import './messenger.css'
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../utils/SharedStates";

const Messages = ({messages, typingStatus}) => {
    const userData = useRecoilValue(loggedInUser);
    const navigate = useNavigate();
    console.log(messages)

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/home');
        window.location.reload();
    };
    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message, i) =>
                    message.userID === userData?.userId ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}
                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
            </div>
        </>
    );
};

export default Messages;
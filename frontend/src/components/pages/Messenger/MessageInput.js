import { useState, useEffect } from 'react';
import './messenger.css'
import io from 'socket.io-client';
const socket = io('localhost:9000');

const MessageInput = ({userId}) => {
  const [message, setMessage] = useState("")
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState('Patrick') //MUSS BEIM LADEN MIT DEM RICHTIGEN USERNAMEN GEFÜLLT WERDEN

  const handleTyping = () => {
    socket.emit('typing', `${userName} is typing...`)
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        name: userName,
        id: `${socket.id}?${userId}`, //entweder kombiniert oder einzeln
        socketID: socket.id,
        userID: userId
      });
    }
    setMessage("")
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  return (
    <div className="chat__footer">
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
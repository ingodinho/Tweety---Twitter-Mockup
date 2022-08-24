import './messenger.css'
import {useState} from "react";
import MessageUserCard from "./MessageUserCard";

const MessengerSide = ({socket}) => {
  const [activeUsers, setActiveUsers] = useState([]);

  socket.on('userConnectionResponse', (data)=> setActiveUsers(data));

  return (
    <div className="chat__sidebar">
    <h2>Open Chat</h2>

    <div>
      <h4 className="chat__header">ACTIVE USERS</h4>
      <div className="chat__users">
        {activeUsers.map(user =>
            <MessageUserCard
              key={user.socketId}
              {...user}
                socket={socket}
            />)}
      </div>
    </div>
  </div>
  );
};

export default MessengerSide;
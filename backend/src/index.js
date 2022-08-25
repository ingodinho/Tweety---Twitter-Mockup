import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import {tweetsRouter} from "./routes/routerTweets.js";
import {usersRouter} from "./routes/routerUsers.js";
import {searchRouter} from "./routes/routerSearch.js";
import {Server} from "socket.io"
import {showUserProfileShort} from "./use-cases/users/show-user-profile-short.js";
import {insertMessage} from "./db-access/messenger-dao.js";
import {messagesRouter} from "./routes/routerMessages.js";

const PORT = process.env.PORT || 9000;
const app = express();
const httpServer = app.listen(PORT, () => console.log("Server is listening on Port: ", PORT));
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        method: "*"
    }
})

// ____________________________
// WEBSOCKET-SERVER

io.on("connection", async (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    const connectedUserId = socket.handshake.auth.userId;
    // socket.join(connectedUserId);
    socket.join('general');

    let users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            socketId: id,
            userId: socket.handshake.auth.userId,
        })
    }
    io.emit("userConnectionResponse", users);

    //Listens and logs the message to the console
    socket.on('message', (data) => {
        console.log(data);
        io.emit("messageResponse", data)
    })

    socket.on('private_message', async ({content, to, userId, messageId}) => {
        let toRooms;
        if(to === 'general') {
            toRooms = ['general']
        }
        else {
            toRooms = [userId + to, to+userId];
        }

        const newMessage = {
            content: content,
            userId: userId,
            messageId: messageId,
            receiver: to,
            from: userId,
            room: toRooms,
            time: Date.now()
        }

        const insertedId = await insertMessage(newMessage);
        console.log(insertedId);
        console.log('userid', userId);
        console.log('to', to)
        io.to(toRooms).emit('private_message', newMessage)
    })

    socket.on('select_user', ({userId, to, prevRoom}) => {
        socket.leave(prevRoom);
        const joinRoom = to === 'general' ? 'general' : userId + to;
        socket.join(joinRoom);
    })

    // User bei Login auf Online-setzen und bei Logout wieder auf Offline
    // User Online-Anzeige bauen
    // userId und userName verarbeiten
    // socket und emit für PN erstellen Sender/server/Empfänger
    // Chats in Mongo speichern
    // Notifications if Users gets online or offline

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketId !== socket.id);
        io.emit('userConnectionResponse', users);
        socket.disconnect();
    });
})

// // NOTIFY OTHER ABOUT USER CONNECTING
// io.on("connection", (socket) => {
// 	// notify existing users
// 	socket.broadcast.emit("user connected", {
// 	  userID: socket.id,
// 	  username: socket.username,
// 	});
//   });
// // MIDDLEWARE FÜR AUTH
// io.use((socket, next) => {
// const username = socket.handshake.auth.username;
// if (!username) {
// 	return next(new Error("invalid username"))
// }
// socket.username = username;
// next()
// })

io.on("private_message", ({content, to}) => {
    io.to(to).emit("private_message", {
        content,
        from: socket.id
    })
})

io.on("connect_error", (err) => {
    console.log("error occured", err.message);
})

// END OF WEBSOCKET_SERVER
// _______________________________________


app.use(cors({origin: [process.env.FRONTEND_URL], credentials: true}));

const oneDayInMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL === "http://localhost:3000";
app.set("trust proxy", 1);
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;
if (!cookieSessionSecret) {
    throw new Error("Cookie Session secret not available");
}
app.use(
    cookieSession({
        name: "session",
        secret: cookieSessionSecret,
        httpOnly: true,
        expires: new Date(Date.now() + oneDayInMs),
        sameSite: isLocalHost ? "lax" : "none",
        secure: isLocalHost ? false : true,
    })
);

// logging middleware
app.use(morgan("dev"));

// JSON Body Parser
app.use(express.json());

// controllers
app.use("/tweets", tweetsRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);
app.use('/messages', messagesRouter);

// const wss = new WebSocketServer({ port: wsPORT });
// wss.on("connection", function connection(ws) {
// 	ws.on("message", function incoming(data) {
// 		wss.clients.forEach(function each(client) {
// 			if (client !== ws && client.readyState === WebSocket.OPEN) {
// 				client.send(data);
// 				// console.log('data', data);
// 			}
// 		});
// 	});
// });

app.get("/", (req, res) => {
    res.send("Works - alles wird wieder ok - Deployment");
});

app.use((_, res) => {
    res.status(404).json({error: "Error: 404 not found"});
});



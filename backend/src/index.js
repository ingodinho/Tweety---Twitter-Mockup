import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import { tweetsRouter } from "./routes/routerTweets.js";
import { usersRouter } from "./routes/routerUsers.js";
import { searchRouter } from "./routes/routerSearch.js";
import { Server } from "socket.io"

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

io.on("connection", (socket) => {
    console.log("new user connected", socket.id);
	const users = [];
	for (let [id, socket] of io.of("/").sockets) {
		users.push({
			userId: id,
			username: socket.username
		})
	}
	socket.emit("users", users)
	io.emit("Willkommen")
})

// NOTIFY OTHER ABOUT USER CONNECTING
io.on("connection", (socket) => {
	// notify existing users
	socket.broadcast.emit("user connected", {
	  userID: socket.id,
	  username: socket.username,
	});
  });
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

io.on("disconnect", (socket) => {
    console.log("user disconnected", socket.id);
})

io.on("connect_error", (err) => {
    console.log("error occured", err.message);
})

// END OF WEBSOCKET_SERVER
// _______________________________________


app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

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
	res.status(404).json({ error: "Error: 404 not found" });
});



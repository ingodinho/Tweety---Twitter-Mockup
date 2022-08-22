import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";

import { tweetsRouter } from "./routes/routerTweets.js";
import { usersRouter } from "./routes/routerUsers.js";
import { searchRouter } from "./routes/routerSearch.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

const oneDayInMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL;
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

app.use(cors());

// logging middleware
app.use(morgan("dev"));

// JSON Body Parser
app.use(express.json());

// controllers
app.use("/tweets", tweetsRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
	res.send("Works - alles wird wieder ok - Deployment");
});

app.use((_, res) => {
	res.status(404).json({ error: "Error: 404 not found" });
});

app.listen(PORT, () => console.log("Server is listening on Port: ", PORT));

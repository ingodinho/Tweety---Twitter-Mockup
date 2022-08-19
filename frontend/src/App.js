import GlobalStyles from "./GlobalStyles";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import LoginPage from "./components/pages/Login/LoginPage";
import RegisterPage from "./components/pages/Register/RegisterPage";
import TweetDetails from "./components/pages/TweetDetails/TweetDetails";
import Profile from "./components/pages/ProfilePage/Profile";
import NewTweet from "./components/pages/NewTweet/NewTweet";
import StartPage from "./components/pages/Start/StartPage";
import Search from "./components/pages/Search/SearchPage";
import EditProfile from "./components/pages/EditProfile/EditProfilePage";
import { useRecoilState } from "recoil";
import { loggedInUser } from "./components/utils/SharedStates";
import ReplyTweet from "./components/pages/ReplyTweet/ReplyTweet";
import AuthRequired from "./components/shared/AuthRequired";
import Redirect from "./components/shared/Tweet/Redirect";

function App() {
	const navigator = useNavigate();
	const [userData, setUserData] = useRecoilState(loggedInUser);

	// localStorage.clear();

	useEffect(() => {
		if (userData) return;
		const localUserData = JSON.parse(localStorage.getItem("userdata"));
		if (localUserData) {
			setUserData(localUserData);
		} else {
			navigator("/");
		}
	}, [userData]);

	return (
		<div className="App">
			<Routes>
				<Route element={<AuthRequired />}>
					<Route path={"/home"} element={<Home />} />
					<Route path={"/search"} element={<Search />} />
					<Route path={"/tweet/:id"} element={<TweetDetails />} />
					<Route path={"/profile/:id"} element={<Profile />} />
					<Route
						path={"/profile/:id/edit"}
						element={<EditProfile />}
					/>
					<Route path={"/newtweet"} element={<NewTweet />} />
					<Route path={"/reply/:id"} element={<ReplyTweet />} />
				</Route>
				<Route element={<Redirect />}>
					<Route path={"/"} element={<StartPage />} />
					<Route path={"/login"} element={<LoginPage />} />
					<Route path={"/register"} element={<RegisterPage />} />
				</Route>
				<Route path={"*"} element={<h1>Page not Found</h1>}></Route>
			</Routes>
			<GlobalStyles />
		</div>
	);
}

export default App;

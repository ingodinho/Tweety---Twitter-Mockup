import GlobalStyles from "./GlobalStyles";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import BottomNav from "./components/shared/BottomNav";
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
import { useEffect } from "react";
import ReplyTweet from "./components/pages/ReplyTweet/ReplyTweet";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
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
  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path={"/"} element={<StartPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/tweet/:id"} element={<TweetDetails />} />
        <Route path={"/profile/:id"} element={<Profile />} />
        <Route path={"/newtweet"} element={<NewTweet />} />
        <Route path={"/reply/:id"} element={<ReplyTweet />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/profile/:id/edit"} element={<EditProfile />} />
      </Routes>
      {location.pathname === "/register" ||
        location.pathname === "/login" ||
        location.pathname === "/start" ||
        location.pathname === "/" || <BottomNav />}
    </div>
  );
}

export default App;

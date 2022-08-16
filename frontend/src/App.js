import GlobalStyles from "./GlobalStyles";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import BottomNav from "./components/shared/BottomNav";
import LoginPage from "./components/pages/Login/LoginPage";
import RegisterPage from "./components/pages/Register/RegisterPage";
import TweetDetails from "./components/pages/TweetDetails/TweetDetails";
import Profile from "./components/pages/ProfilePage/Profile";
import StartPage from "./components/pages/Start/StartPage";
import LandingPage from "./components/pages/Landing/LandingPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/tweet/:id"} element={<TweetDetails />} />
        <Route path={"/profile/:id"} element={<Profile />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/start"} element={<StartPage />} />
      </Routes>
      {location.pathname === "/register" || location.pathname === "/login" || (
        <BottomNav />
      )}
      <GlobalStyles />
    </div>
  );
}

export default App;

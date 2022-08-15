import GlobalStyles from "./GlobalStyles";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import BottomNav from "./components/shared/BottomNav";
import LoginPage from "./components/pages/Login/LoginPage";
import RegisterPage from "./components/pages/Register/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
      </Routes>
      <BottomNav />

      <GlobalStyles />
    </div>
  );
}

export default App;
import GlobalStyles from "./GlobalStyles";
import Home from "./components/pages/Home/Home";
import BottomNav from "./components/shared/BottomNav";
import RegisterPage from "./components/pages/Register/RegisterPage";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
            </Routes>
            <BottomNav/>
            <GlobalStyles/>
        </div>
    );
}

export default App;
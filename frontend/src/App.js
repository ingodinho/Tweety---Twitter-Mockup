import GlobalStyles from "./GlobalStyles";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import BottomNav from "./components/shared/BottomNav";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/home'} element={<Home/>}/>
        </Routes>
        <BottomNav/>
      <GlobalStyles />
    </div>
  );
}

export default App;
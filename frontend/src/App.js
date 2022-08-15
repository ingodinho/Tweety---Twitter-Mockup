import GlobalStyles from "./GlobalStyles";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./components/pages/Register/RegisterPage";

function App() {
  return (
    <div className="App">
      <h1>Test</h1>
      <GlobalStyles />
      <RegisterPage />
    </div>
  );
}

export default App;

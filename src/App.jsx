import { Route, Routes } from "react-router-dom";
import "./App.css";
import Logo from "./components/Logo";
import Users from "./Routes/Users";
import UserInfo from "./Routes/UserInfo";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-200 py-3 font-bold text-xl">
        <Logo />
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/:name" element={<UserInfo />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

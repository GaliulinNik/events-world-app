import React from "react";
import "./App.css";
//import { Login } from "./pages/login/login";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { UserContext } from "./contexts/User";
import { Routes, Route } from "react-router-dom";

const User = {
  role: "user",
  name: "",
};

function App() {
  return (
    // <div className="rootStyle">
    //   <UserContext.Provider value={User}>
    //     <Login />
    //   </UserContext.Provider>
    // </div>
    <Routes>
      <Route path="/login/" element={<Login />} />
      <Route path="/home/" element={<Home />} />
    </Routes>
  );
}

export default App;

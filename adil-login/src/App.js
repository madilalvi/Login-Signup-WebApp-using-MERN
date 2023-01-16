import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setLoginUser] = useState({});
  const [token, setLoginToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              token || (user && user._id) ? (
                <Home setLoginUser={setLoginUser} />
              ) : (
                <Login
                  setLoginUser={setLoginUser}
                  setLoginToken={setLoginToken}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setLoginUser={setLoginUser}
                setLoginToken={setLoginToken}
              />
            }
          />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

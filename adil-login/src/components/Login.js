import React, { useState } from "react";
import "./BoxDesign.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login({ setLoginUser, setLoginToken }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", userData);
      if (res.data.token) {
        setLoginToken(res.data.token);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      }
      alert(res.data.message);
      setLoginUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Box">
      <h1>Login</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="text"
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>

      <Button
        variant="contained"
        onClick={login}
        sx={{ width: "15ch", margin: 1 }}
      >
        Login
      </Button>
      <h4>Or</h4>

      <Button
        variant="contained"
        onClick={() => navigate("/signup")}
        sx={{ width: "15ch" }}
      >
        Sign-up
      </Button>
    </div>
  );
}

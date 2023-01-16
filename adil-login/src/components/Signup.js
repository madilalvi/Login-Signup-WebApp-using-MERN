import React, { useState } from "react";
import "./BoxDesign.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const register = () => {
    const { name, email, password, confirmPassword } = userData;
    if (name && email && password && password === confirmPassword) {
      axios.post("http://localhost:4000/signup", userData).then((res) => {
        alert(res.data.message);
        navigate("/login");
      });
    } else {
      alert("invlid input");
    }
  };

  return (
    <div className="Box">
      <h1>Sign-up</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>
      <Button
        variant="contained"
        onClick={register}
        sx={{ width: "15ch", margin: 1 }}
      >
        Sign-up
      </Button>
      <h4>Or</h4>
      <Button
        variant="contained"
        onClick={() => navigate("/login")}
        sx={{ width: "15ch" }}
      >
        Login
      </Button>
    </div>
  );
}

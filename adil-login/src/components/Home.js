import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Home({ setLoginUser }) {
  let navigate = useNavigate();
  const logout = () => {
    setLoginUser({});
    localStorage.setItem("token", JSON.stringify(""));
    navigate("/login");
  };
  return (
    <div className="Home">
      <h1>Home</h1>
      <Button
        variant="outlined"
        onClick={() => logout()}
        sx={{ width: "15ch", margin: 1, color: "Red", background: "Black" }}
      >
        Logout
      </Button>
    </div>
  );
}

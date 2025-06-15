import React, { useState } from "react";
import "./login.css";
import { loginEmployee } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await loginEmployee({
        username,
        password,
      });

      if (resp.status == 200) {
        localStorage.setItem("sessionKey", resp.content?.sessionKey || "");
        localStorage.setItem("accountId", resp.content?.id || "");

        console.log("Logged in employee", resp.content);

        navigate("/project");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginTitle">Login</div>
        <form onSubmit={login}>
          <div>
            <label>Username</label>
          </div>
          <div className="formGroup">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
          </div>
          <div className="formGroup">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="loginBtn">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import "../styles/login.css";

const LogIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    // TODO login logic
  };

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <form onSubmit={handleLogIn}>
        <div className="input-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <p>No account? <a href="/signup">Click here to sign up!</a></p>
    </div>
  );
};

export default LogIn;

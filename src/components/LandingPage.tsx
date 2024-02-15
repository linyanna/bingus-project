import React from "react";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitPlay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      navigate("/dashboard");
  };

  const handleSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1>Bingus the SQL Sleuth</h1>
        <form onSubmit={handleSubmitPlay}>
          <button className="button"> Play</button>
        </form>
        <form onSubmit={handleSubmitSignup}>
          <button className="signupbutton"> Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitPlay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Check if the user is logged in
    const isLoggedIn = true; // Replace with something real

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
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
          <button className="button"> Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;

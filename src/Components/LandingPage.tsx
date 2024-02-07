import React from 'react';
import "../styles/LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Check if the user is logged in
    const isLoggedIn = true; // Replace with something real


    if (isLoggedIn) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1>Bingus the SQL Sleuth</h1>
        <form onSubmit={handleSubmit}>
          <button className="button"> Play</button>
        </form>
        <div className="auth-links">
          <a href="/signup">Sign Up</a>
          <span> or </span>
          <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

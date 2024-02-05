import React from 'react';

const LandingPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
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

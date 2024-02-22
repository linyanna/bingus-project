import React from "react";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";
import FileContainer from "./FileContainer";

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

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <FileContainer>
      <div className="tab-container">
        <div className="tab">Welcome!</div>
      </div>

      <div className="Main" style={{ display: "flex" }}>
        <div className="img-container">
          <img src="../../Bingus_With_Hat.png" alt="Bingus Pic" />
        </div>

        <div className="right" style={{ flex: 1 }}>
          <div className="landing-page">
            <div className="landing-page-content">
              <h1>Bingus</h1>
              <h2>The SQL Sleuth</h2> 
              <form onSubmit={handleSubmitPlay}>
                <button className="button">Play</button>
              </form>

              <div className="buttons-container">
                <form onSubmit={handleSubmitSignup}>
                  <button className="signupbutton">Sign Up</button>
                </form>

                <span className="button-text">OR</span> {/* Insert text between the buttons */}

                <form onSubmit={handleSubmitLogin}>
                  <button className="signupbutton">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FileContainer>
  );
};

export default LandingPage;

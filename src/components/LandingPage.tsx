import React from "react";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";
import FileContainer from "./FileContainer";
import { Button } from "@/components/ui/button";

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
                <Button className="button">Play</Button>
              </form>

              <div className="buttons-container">
                <form onSubmit={handleSubmitSignup}>
                  <Button className="signupbutton">Sign Up</Button>
                </form>
                <span className="button-text">OR</span>{" "}
                {/* Insert text between the buttons */}
                <form onSubmit={handleSubmitLogin}>
                  <Button className="signupbutton">Login</Button>
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

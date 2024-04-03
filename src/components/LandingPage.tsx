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
        <div className="tab font-bold text-gray-600">Welcome!</div>
      </div>

      <div className="Main " style={{ display: "flex" }}>
        <div className="img-container">
        <img src="../../Bingus_With_Hat.png" alt="Bingus Pic" />
        </div>

        <div className="right" style={{ flex: 1, marginTop:"12vh" }}>
              <h1 className="text-9xl font-extrabold text-center mb-6 mt-20 mt-24 text-gray-600">Bingus</h1>
              <h2  className="text-6xl font-bold tracking-tight text-center mb-8 text-gray-600">The SQL Sleuth</h2>
  
                <form className="w-full flex justify-center" onSubmit={handleSubmitPlay}>
                  <Button className="py-8 px-20 text-3xl mb-6 text-gray text-gray-600">Play</Button>
                </form>
      

              <div className="flex justify-center">
                <form onSubmit={handleSubmitSignup}>
                  <Button className="text-2xl text-gray-600" variant="link">Sign Up</Button>
                </form>
                <div className="text-gray-600 mt-2">OR</div>
                <form onSubmit={handleSubmitLogin}>
                <Button className="text-2xl text-gray-600" variant="link">Log in</Button>
                </form>
            
            </div>
          </div>
       
      </div>
    </FileContainer>
  );
};

export default LandingPage;

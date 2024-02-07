import React from "react";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <a href="#" className="tab active">Brief</a>
      <a href="#" className="tab">SQL</a>
      <a href="#" className="tab">Results</a>
      <a href="#" className="tab">Guide</a>
      <a href="#" className="tab">Profile</a>
    </div>
  );
};

export default Navbar;

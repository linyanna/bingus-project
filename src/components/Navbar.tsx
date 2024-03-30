import React from "react";
import "../styles/navbar.css";

// Define the Tab enum
export enum Tab {
  BRIEF,
  SQL,
  RESULTS,
  GUIDE,
  PROFILE
}

interface NavbarProps {
  setActiveTab: (tab: Tab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveTab }) => {
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="parent">
        <div className="navbar">
          <a href="#" className="tab font-bold text-gray-600" onClick={() => handleTabClick(Tab.BRIEF)}>Brief</a>
          <a href="#" className="tab font-bold text-gray-600" onClick={() => handleTabClick(Tab.SQL)}>Notebook</a>
          <a href="#" className="tab font-bold text-gray-600" onClick={() => handleTabClick(Tab.RESULTS)}>Evidence</a>
          <a href="#" className="tab font-bold text-gray-600" onClick={() => handleTabClick(Tab.GUIDE)}>Guide</a>
          <a href="#" className="tab font-bold text-gray-600" onClick={() => handleTabClick(Tab.PROFILE)}>Profile</a>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import "../styles/navbar.css";

// Define the Tab enum
export enum Tab {
  BRIEF,
  SQL,
  RESULTS,
  GUIDE,
  PROFILE,
}

interface NavbarProps {
  setActiveTab: (tab: Tab) => void;
}

// Create a Navbar component that will render the tabs
const Navbar: React.FC<NavbarProps> = ({ setActiveTab }) => {
  const handleTabClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tab: Tab
  ) => {
    event.preventDefault();
    setActiveTab(tab);

    // Remove "active" class from all tabs
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add "active" class to the clicked tab
    event.currentTarget.classList.add("active");
  };

  return (
    <div className="navbar">
      <a

        href="#"
        className="tab font-bold text-gray-600"
        onClick={(e) => handleTabClick(e, Tab.BRIEF)}>
        Brief
      </a>
      <a
        href="#"
        className="tab font-bold text-gray-600"
        onClick={(e) => handleTabClick(e, Tab.SQL)}>
        Notebook
      </a>
      <a
        href="#"
        className="tab font-bold text-gray-600"
        onClick={(e) => handleTabClick(e, Tab.RESULTS)}>
        Evidence
      </a>
      <a
        href="#"
        className="tab font-bold text-gray-600"
        onClick={(e) => handleTabClick(e, Tab.GUIDE)}>
        Guide
      </a>
      <a
        href="#"
        className="tab font-bold text-gray-600"
        onClick={(e) => handleTabClick(e, Tab.PROFILE)}>
        Profile
      </a>
      <div className="mode-toggle">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

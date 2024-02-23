import React from "react";
import Profile from "./Profile";
import SqlEditor from "./SqlEditor";
import Brief from "./Brief";
import Guide from "./Guide"
import Results from "./Results";
import { Tab } from "./Navbar"; 
import FileContainer from "./FileContainer";
import '../styles/dashboard.css'; 

interface DashboardProps {
  activeTab: Tab; // pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div className="parent">
    <FileContainer>
        <div className="nav">
          {activeTab === Tab.BRIEF && <Brief />}
          {activeTab === Tab.SQL && <SqlEditor />}
          {activeTab === Tab.RESULTS && <Results />}
          {activeTab === Tab.GUIDE && <Guide />}
          {activeTab === Tab.PROFILE && <Profile />}
        </div>
      </FileContainer>
    </div>
  );
};

export default Dashboard;

import React from "react";
import Profile from "./Profile";
import SqlEditor from "./SqlEditor";
import Brief from "./Brief";
import Guide from "./Guide"
import Results from "./Results";
import { Tab } from "./Navbar"; 

interface DashboardProps {
  activeTab: Tab; // pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div>
      
      {activeTab === Tab.BRIEF && <Brief />}
      {activeTab === Tab.SQL && <SqlEditor />}
      {activeTab === Tab.RESULTS && <Results />}
      {activeTab === Tab.GUIDE && 
        <Guide 
          open
          title="What is SQL?"
          children={"Structured Query Language"}
        />
      }
      {activeTab === Tab.PROFILE && <Profile />}


    </div>
  );
};

export default Dashboard;

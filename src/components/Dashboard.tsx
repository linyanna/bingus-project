import React from "react";
import Profile from "./Profile";
import SqlEditor from "./SqlEditor";
import { Tab } from "./Navbar"; 

interface DashboardProps {
  activeTab: Tab; // Pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div>
   
      {activeTab === Tab.SQL && <SqlEditor />}
      {activeTab === Tab.PROFILE && <Profile />}
    </div>
  );
};

export default Dashboard;

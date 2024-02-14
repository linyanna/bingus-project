import React from "react";
//import Profile from "./Profile";
import SqlEditor from "./SqlEditor";
import { Tab } from "./Navbar"; 

interface DashboardProps {
  activeTab: Tab; // Pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div>
   
      {activeTab === Tab.SQL && <SqlEditor />}
      {/* Add more components for other tabs */}
    </div>
  );
};

export default Dashboard;

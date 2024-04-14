import React from "react";
import SqlEditor from "./SqlEditor";
import Brief from "./Brief";
import Guide from "./Guide";
import Results from "./Results";
import { Tab } from "./Navbar";
import "../styles/dashboard.css";
import Profile, { supabase } from "./Profile";

interface DashboardProps {
  activeTab: Tab; // pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div className="filecontainer">
      {activeTab === Tab.BRIEF && <Brief supabase={supabase} />}
      {activeTab === Tab.SQL && <SqlEditor />}
      {activeTab === Tab.RESULTS && <Results />}
      {activeTab === Tab.GUIDE && <Guide />}
      {activeTab === Tab.PROFILE && <Profile />}
    </div>
  );
};

export default Dashboard;

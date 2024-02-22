import React from "react";
import Profile from "./Profile";
import SqlEditor from "./SqlEditor";
import Brief from "./Brief";
import Guide from "./Guide"
import Results from "./Results";
import { Tab } from "./Navbar"; 
import FileContainer from "./FileContainer";

interface DashboardProps {
  activeTab: Tab; // pass the active tab as a prop
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
  <FileContainer>
      <div>
        {activeTab === Tab.BRIEF && <Brief />}
        {activeTab === Tab.SQL && <SqlEditor />}
        {activeTab === Tab.RESULTS && <Results />}
        {activeTab === Tab.GUIDE && <Guide />}
        {activeTab === Tab.PROFILE && <Profile />}
      </div>
    </FileContainer>
  );
};

export default Dashboard;

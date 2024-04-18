import React from "react";
import SqlEditor from "./SqlEditor";
import Brief from "./Brief";
import Guide from "./Guide";
import Results from "./Results";
import Profile from "./Profile";
import { Tab } from "./Navbar";
// import FileContainer from "./FileContainer";
import { SupabaseClient } from '@supabase/supabase-js';

interface DashboardProps {
  activeTab: Tab;
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, supabase, setActiveTab }) => {
  return (
    <div className="filecontainer">
     {/* <FileContainer> */}
      {activeTab === Tab.BRIEF && <Brief supabase={supabase} setActiveTab={setActiveTab} />}
      {activeTab === Tab.SQL && <SqlEditor supabase={supabase} setActiveTab={setActiveTab}/>}
      {activeTab === Tab.RESULTS && <Results />}
      {activeTab === Tab.GUIDE && <Guide />}
      {activeTab === Tab.PROFILE && <Profile />}
      {/* </FileContainer> */}
      </div>
  );
};

export default Dashboard;

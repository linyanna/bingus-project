import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { createClient, Session } from "@supabase/supabase-js";
import LandingPage from "./components/LandingPage";
import Navbar, { Tab } from "./components/Navbar"; // Importing Tab enum from Navbar.tsx
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
//import TextBox from "./components/textbox";
import "./App.css";
import { config } from "./config";
const { supabaseUrl, supabaseAnonKey } = config;

const url = supabaseUrl;
const key = supabaseAnonKey;

if (!url || !key) {
  throw new Error(
    "Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required"
  );
}

const supabase = createClient(url, key);

function App() {
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BRIEF); // Initialize the active tab

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navbarPaths = ["/dashboard"];
  const isNavbarVisible = navbarPaths.includes(location.pathname);

  //handle setting the active tab
  const handleSetActiveTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      {isNavbarVisible && <Navbar setActiveTab={handleSetActiveTab} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard activeTab={activeTab} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            session ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup supabaseClient={supabase} />
            )
          }
        />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login supabaseClient={supabase} />
            )
          }
        />
        <Route path="*">"404 Not Found"</Route>
      </Routes>
    </div>
  );
}

export default App;

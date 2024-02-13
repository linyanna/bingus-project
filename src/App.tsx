import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";

import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
//import SqlEditor from "./components/SqlEditor";
import "./App.css";

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required"
  );
}

const supabase = createClient(url, key);

function App() {
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);

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

  return (
    <div className="app">
      {isNavbarVisible && <Navbar />} {}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/signup"
          element={session ? <Navigate to="/dashboard" /> : <Signup supabaseClient={supabase} />}
        />
        <Route path="*">"404 Not Found"</Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './components/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Dashboard from './components/Dashboard.tsx';
import Signup from './components/Signup.tsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';


const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

const App: React.FC = () => {
  const location = useLocation();
  const supabase = createClient(url, key);
  
  //can add navbar to other pages
  const navbarPaths = ["/dashboard"];

  const isNavbarVisible = navbarPaths.includes(location.pathname);

  return (
    <div>
      {isNavbarVisible && <Navbar />} {}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup supabaseClient={supabase}/>} />
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

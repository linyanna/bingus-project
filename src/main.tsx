import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './Components/LandingPage.tsx';
import Navbar from './Components/Navbar.tsx';
import Dashboard from './Components/Dashboard.tsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  
  //can add navbar to other pages
  const navbarPaths = ["/dashboard"];

  const isNavbarVisible = navbarPaths.includes(location.pathname);

  return (
    <div>
      {isNavbarVisible && <Navbar />} {}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
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

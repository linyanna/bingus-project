import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './Components/LandingPage.tsx';
import Login from './Components/Login.tsx'; // Import the Login component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

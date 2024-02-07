import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './Components/LandingPage.tsx';
import LogIn from './Components/Login.tsx';
import SignUp from './Components/SignUp.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

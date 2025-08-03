import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DonationPage from './pages/DonationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path='/' element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
                    <Route path='/login' element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path='/dashboard' element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
                    <Route path='/donate' element={<DonationPage />} />
                    <Route path='/leaderboard' element={<LeaderboardPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
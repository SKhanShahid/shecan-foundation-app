import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DonationPage from './pages/DonationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css';

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path='/' element={user ? <Navigate to='/dashboard' /> : <LandingPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/dashboard' element={user ? <DashboardPage /> : <Navigate to='/login' />} />
                    <Route path='/donate' element={<DonationPage />} />
                    <Route path='/leaderboard' element={<LeaderboardPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
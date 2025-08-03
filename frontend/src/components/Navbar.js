import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f4f4f4' }}>
            <div style={{ fontWeight: 'bold' }}>
                <Link to='/'>SheCan Foundation</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link to='/dashboard' style={{ marginRight: '1rem' }}>Dashboard</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <Link to='/login' style={{ marginRight: '1rem' }}>Login</Link>
                )}
                <Link to='/leaderboard' style={{ marginRight: '1rem' }}>Leaderboard</Link>
                <Link to='/donate'>Donate</Link>
            </div>
        </nav>
    );
};

export default Navbar;
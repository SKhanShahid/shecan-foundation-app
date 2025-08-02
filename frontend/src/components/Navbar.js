import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f4f4f4' }}>
            <div style={{ fontWeight: 'bold' }}>
                <Link to='/'>SheCan Foundation</Link>
            </div>
            <div>
                {user ? (
                    <>
                        <Link to='/dashboard' style={{ marginRight: '1rem' }}>Dashboard</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <Link to='/' style={{ marginRight: '1rem' }}>Login</Link>
                )}
                <Link to='/leaderboard' style={{ marginRight: '1rem' }}>Leaderboard</Link>
                <Link to='/donate'>Donate</Link>
            </div>
        </nav>
    );
};

export default Navbar;
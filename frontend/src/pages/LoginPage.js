import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const API_URL = 'https://shecan-foundation-app.onrender.com/api/interns/';

        if (isLogin) {
            // Login logic
            try {
                const response = await axios.post(API_URL + 'login', { email, password });
                localStorage.setItem('user', JSON.stringify(response.data));
                onLogin();
                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error.response?.data?.message);
            }
        } else {
            // Signup logic
            try {
                const response = await axios.post(API_URL, { name, email, password });
                localStorage.setItem('user', JSON.stringify(response.data));
                onLogin();
                navigate('/dashboard');
            } catch (error) {
                console.error('Signup failed:', error.response?.data?.message);
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{isLogin ? 'Intern Login' : 'Intern Signup'}</h1>
            <form onSubmit={onSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                        style={{ display: 'block', margin: '10px 0', padding: '8px' }}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                    style={{ display: 'block', margin: '10px 0', padding: '8px' }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    style={{ display: 'block', margin: '10px 0', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '1rem', marginTop: '10px' }}>
                    {isLogin ? 'Login' : 'Signup'}
                </button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: '20px' }}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default LoginPage;
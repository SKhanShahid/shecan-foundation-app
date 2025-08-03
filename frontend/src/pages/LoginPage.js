import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
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

        if (isLogin) {
            // Login logic
            try {
                const response = await axios.post('https://shecan-foundation-app.onrender.com', {
                    email,
                    password,
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error.response.data.message);
            }
        } else {
            // Signup logic
            try {
                const response = await axios.post('https://shecan-foundation-app.onrender.com', {
                    name,
                    email,
                    password,
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            } catch (error) {
                console.error('Signup failed:', error.response.data.message);
            }
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Intern Login' : 'Intern Signup'}</h1>
            <form onSubmit={onSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default LoginPage;
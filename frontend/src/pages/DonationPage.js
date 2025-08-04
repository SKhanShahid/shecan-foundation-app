import React, { useState } from 'react';
import axios from 'axios';

const DonationPage = () => {
    const [formData, setFormData] = useState({
        amount: '',
        donorName: '',
        referralCode: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { amount, donorName, referralCode } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const API_URL = 'https://shecan-foundation-app.onrender.com/api/donations';
            
            const response = await axios.post(API_URL, {
                amount: parseInt(amount),
                donorName,
                referralCode,
            });
            setMessage('Thank you for your donation!');
            console.log('Donation successful:', response.data);
            setLoading(false);
            setFormData({ amount: '', donorName: '', referralCode: '' });
        } catch (error) {
            setMessage('Donation failed. Please check the referral code and amount.');
            console.error('Donation failed:', error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Make a Donation</h1>
            <p>Please enter the intern's referral code to donate to their cause.</p>
            {message && <h2>{message}</h2>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="referralCode"
                    value={referralCode}
                    onChange={onChange}
                    placeholder="Intern Referral Code"
                    required
                />
                <input
                    type="text"
                    name="donorName"
                    value={donorName}
                    onChange={onChange}
                    placeholder="Your Name (Optional)"
                />
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={onChange}
                    placeholder="Donation Amount"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Donate'}
                </button>
            </form>
        </div>
    );
};

export default DonationPage;
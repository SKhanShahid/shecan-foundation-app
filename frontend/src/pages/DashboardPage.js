import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const [intern, setIntern] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Helper functions for the buttons
    const onCopyLink = () => {
        const donationLink = `${window.location.origin}/donate?referralCode=${intern.referralCode}`;
        navigator.clipboard.writeText(donationLink);
        alert('Donation link copied to clipboard!');
    };

    const onShareWhatsApp = () => {
        const donationLink = `${window.location.origin}/donate?referralCode=${intern.referralCode}`;
        const message = encodeURIComponent(`Please donate to my cause using this link: ${donationLink}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get('https://shecan-foundation-app.onrender.com/api/interns/dashboard', config);
                setIntern(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                localStorage.removeItem('user');
                navigate('/login');
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!intern) {
        return <h1>Error loading dashboard. Please log in again.</h1>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome, {intern.name}!</h1>
            <h3>Your Referral Code: {intern.referralCode}</h3>
            <p>Total Amount Raised: ₹{intern.totalAmountRaised}</p>
            <p>Total Donors: {intern.totalDonors}</p>
            <p>Badges: {intern.badges && intern.badges.join(', ')}</p>
            <div style={{ marginTop: '2rem' }}>
                <button onClick={onCopyLink} style={{ marginRight: '1rem', padding: '10px 20px' }}>
                    Copy Donation Link
                </button>
                <button onClick={onShareWhatsApp} style={{ padding: '10px 20px' }}>
                    Share on WhatsApp
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
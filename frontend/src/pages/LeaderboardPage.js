import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('https://shecan-foundation-app.onrender.com/api/interns/leaderboard');
                if (Array.isArray(response.data)) {
                    setLeaderboard(response.data);
                } else {
                    setLeaderboard([]); // Ensure it's an array even on error
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
                setLeaderboard([]);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) {
        return <h1>Loading Leaderboard...</h1>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Top Interns Leaderboard</h1>
            {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                <ol>
                    {leaderboard.map((intern, index) => (
                        <li key={intern._id}>
                            <strong>{intern.name}</strong> - Raised ₹{intern.totalAmountRaised} ({intern.totalDonors} donors)
                        </li>
                    ))}
                </ol>
            ) : (
                <p>No interns on the leaderboard yet, or data could not be fetched.</p>
            )}
        </div>
    );
};

export default LeaderboardPage;
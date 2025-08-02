import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interns/leaderboard');
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <h1>Loading Leaderboard...</h1>;
  }

  return (
    <div>
      <h1>Top Interns Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No interns on the leaderboard yet.</p>
      ) : (
        <ol>
          {leaderboard.map((intern, index) => (
            <li key={intern._id}>
              <strong>{intern.name}</strong> - Raised ₹{intern.totalAmountRaised} ({intern.totalDonors} donors)
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default LeaderboardPage;
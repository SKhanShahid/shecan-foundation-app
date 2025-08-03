import React, { useState } from 'react';
import axios from 'axios';

const DonationPage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    referralCode: '',
  });
  const [message, setMessage] = useState('');

  const { amount, donorName, referralCode } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shecan-foundation-app.onrender.com', formData);
      setMessage('Thank you for your donation!');
      console.log('Donation successful:', response.data);
    } catch (error) {
      setMessage('Donation failed. Please check the referral code.');
      console.error('Donation failed:', error.response.data.message);
    }
  };

  return (
    <div>
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
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationPage;
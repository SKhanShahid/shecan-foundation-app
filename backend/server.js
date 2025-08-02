const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define a function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the SheCan Foundation API!');
});

// Use the intern routes for any requests to /api/interns
app.use('/api/interns', require('./routes/internRoutes'));

// Use the donation routes for any requests to /api/donations
app.use('/api/donations', require('./routes/donationRoutes'));

// Use the admin routes for any requests to /api/admins
app.use('/api/admins', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const checkListRoutes = require('./routes/checkListRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false }, ()=> {
    console.log("Connected to MONGODB");
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/users', authRoutes);
app.use('/api/checklist', checkListRoutes)

// INITIALISE SERVER
app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}`);
});
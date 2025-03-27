require('dotenv').config(); // MUST be the first line

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth'); // Loaded after dotenv
const driveRoutes = require('./routes/drive');
require('dotenv').config({ path: './.env' }); // Explicitly specify the .env file path
// Rest of the code remains the same...

const app = express();

// Debug: Log environment variables to confirm they’re loaded
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/drive', driveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // Load vars from .env

const app = express();
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect tp MongoDB (Mongoose)
// We use mongoose.connect() with our URI from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB failed to connect:', err));


// Routes
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
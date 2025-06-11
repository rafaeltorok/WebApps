const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

// @route   GET /api/users
// @desc    List all users or search by query (protected)
router.get('/', authenticateToken, async(req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      // Case-insensitive regex search on name or email
      query = { $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]};
    }
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
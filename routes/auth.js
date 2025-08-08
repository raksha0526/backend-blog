// routes/user.js or wherever your register route is

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// POST /api/register
router.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'Email already registered' });

    // Don't allow isAdmin to be set by request
    const user = new User({
      username,
      email,
      password,
      isAdmin: false // Always set false manually
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username,
        email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

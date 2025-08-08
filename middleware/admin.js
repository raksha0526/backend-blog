// middleware/adminOnly.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminOnly = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error (admin check)' });
  }
};

module.exports = adminOnly;

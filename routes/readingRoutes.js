const express = require('express');
const router = express.Router();
const ReadingList = require('../models/ReadingList');
const { auth } = require('../middleware/auth'); // destructure auth middleware

// GET /api/readinglist (mounted at /api/readinglist)
router.get('/', auth, async (req, res) => {
  try {
    const list = await ReadingList.find({ user: req.user.id }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/readinglist (mounted at /api/readinglist)
router.post('/', auth, async (req, res) => {
  try {
    const newItem = new ReadingList({ ...req.body, user: req.user.id });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

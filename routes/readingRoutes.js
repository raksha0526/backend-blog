const express = require('express');
const router = express.Router();
const ReadingList = require('../models/ReadingList');

// GET all reading list items
router.get('/api/readinglist', async (req, res) => {
  const list = await ReadingList.find().sort({ date: -1 });
  res.json(list);
});

// POST new book to reading list
router.post('/api/readinglist', async (req, res) => {
  try {
    const newItem = new ReadingList(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


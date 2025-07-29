const mongoose = require('mongoose');

const readingListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  cover: String,
  completed: Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReadingList', readingListSchema);

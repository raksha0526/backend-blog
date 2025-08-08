// models/ReadingList.js
const mongoose = require('mongoose');

const ReadingListSchema = new mongoose.Schema({
  title: String,
  author: String,
  cover: String,
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReadingList', ReadingListSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String, // Or you can populate this dynamically
  text: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);

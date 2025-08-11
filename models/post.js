const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: String,
  bookAuthor: String,       // renamed for clarity
  content: String,
  image: String,
  author: {                 // blog post creator
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
}, { collection: 'books' }); // keep if your collection is named "books"

module.exports = mongoose.model('Post', postSchema);

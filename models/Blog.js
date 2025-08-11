const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {type: String, required:true},
  content: {type: String, required:true}, 
  image: {type: String, required:true}, 
  author:{type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', blogSchema);
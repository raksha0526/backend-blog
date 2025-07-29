const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all posts
router.get('/api/posts', async (req, res) => {
  const posts = await Blog.find().sort({ date: -1 });
  res.json(posts);
});

// GET single post by ID
router.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error fetching post by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new post
router.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Blog(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving blog post" });
  }
});

module.exports = router;

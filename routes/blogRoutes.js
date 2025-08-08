const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult } = require('express-validator');

// GET /api/posts/
router.get('/', async (req, res) => {
  const posts = await Blog.find().sort({ date: -1 });
  res.json(posts);
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts/
router.post(
  '/',
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('image').optional().isString(),
    body('author').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newPost = new Blog(req.body);
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      console.error('Error saving post:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;

// routes/admin.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const adminOnly = require('../middleware/adminOnly');
const { body, validationResult } = require('express-validator');

// Create post
router.post('/posts', adminOnly, [
  body('title').notEmpty(),
  body('content').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || '',
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Edit post
router.put('/posts/:id', adminOnly, [
  body('title').optional().notEmpty(),
  body('content').optional().notEmpty(),
], async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
router.delete('/posts/:id', adminOnly, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
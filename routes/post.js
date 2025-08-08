const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Post = require('../models/post');
const auth = require('../middleware/auth');

// POST comment to a blog post
router.post(
  '/api/posts/:id/comment',
  auth,
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ max: 500 })
    .withMessage('Comment must be under 500 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      post.comments.push({
        userId: req.user._id,
        username: req.user.username,
        text: req.body.text
      });

      await post.save();
      res.status(201).json(post.comments);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

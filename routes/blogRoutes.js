const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Post = require('../models/post');

// GET all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET single post by ID (public or protected depending on your choice)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST create new post (authenticated)
router.post('/', auth, async (req, res) => {
  const { title, bookAuthor, image, content } = req.body;
  if (!title || !content || !bookAuthor) 
    return res.status(400).json({ message: 'Title, Book Author, and content required' });

  try {
    const post = new Post({
      title,
      bookAuthor,
      image,
      content,
      author: req.user._id
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE post (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

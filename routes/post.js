const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')  // Adjust 'username' to your User model field
      .sort({ createdAt: -1 });
      
    const postsWithAuthor = posts.map(post => ({
      _id: post._id,
      title: post.title,
      image: post.image,
      content: post.content,
      bookAuthor: post.author ? post.author.username : 'Unknown',
      date: post.createdAt,
    }));

    res.json(postsWithAuthor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({
      _id: post._id,
      title: post.title,
      image: post.image,
      content: post.content,
      bookAuthor: post.author ? post.author.username : 'Unknown',
      date: post.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

module.exports = router;

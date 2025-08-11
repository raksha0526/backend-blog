const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
// server.js
const adminRoutes = require('./routes/admin');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));

// Serve frontend/admin folder
app.use('/admin', express.static(path.join(__dirname, '../frontend/admin')));


// Import & use routes
app.use('/api/auth', authRoutes);

const blogRoutes = require('./routes/blogRoutes');
const readingRoutes = require('./routes/readingRoutes');


app.use('/api/posts', blogRoutes);

app.use('/api/reading', readingRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
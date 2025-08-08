const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import & use routes
const blogRoutes = require('./routes/blogRoutes');
const readingRoutes = require('./routes/readingRoutes');


app.use('/api/posts', blogRoutes);

app.use(readingRoutes); // ✅ make sure this is after app is defined

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Database connection - connect first, then start server
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/ai-consultant';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:');
    console.error(err && err.message ? err.message : err);
    console.error('\nIf you intended to use MongoDB Atlas, set a proper MONGODB_URI in backend/.env or backend/.env.example.');
    console.error('Example Atlas URI format: mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ai-consultant?retryWrites=true&w=majority');
    console.error('Make sure you created a DB user and allowed your IP in Network Access.');
    process.exit(1);
  });
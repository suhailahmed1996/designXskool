const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/design-codex';

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// StudentList schema & model
const studentListSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    whatsAppNumber: { type: String, required: true, trim: true },
    dayType: {
      type: String,
      required: true,
      enum: ['weekdays', 'weekend'],
      lowercase: true,
      trim: true,
    },
    summary: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

const StudentList = mongoose.model('StudentList', studentListSchema);

// API routes
// app.get('/api/students', async (req, res) => {
//   try {
//     const students = await StudentList.find().sort({ createdAt: -1 });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch students', error: error.message });
//   }
// });

app.post('/api/students', async (req, res) => {
  try {
    const { fullName, email, whatsAppNumber, dayType, summary } = req.body;
    const student = await StudentList.create({ fullName, email, whatsAppNumber, dayType, summary });
    res.status(201).json(student);
  } catch (error) {
    const status = error.name === 'ValidationError' || error.code === 11000 ? 400 : 500;
    const message =
      error.code === 11000 ? 'Email already exists in student list' : error.message || 'Failed to create student';
    res.status(status).json({ message, error: error.message });
  }
});



// Example API route
app.get('/api/students', (req, res) => {
  res.json({ message: 'Hello from Node backend!' });
});

// Serve React build (for production)
app.use(express.static(path.join(__dirname, '../build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

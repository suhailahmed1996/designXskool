const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection - reuse connection if exists
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/design-codex';
  
  try {
    await mongoose.connect(mongoUri);
    cachedDb = mongoose.connection;
    console.log('✅ Connected to MongoDB');
    return cachedDb;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

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

const StudentList = mongoose.models.StudentList || mongoose.model('StudentList', studentListSchema);

// API routes - paths should match what comes after /api/ in the redirect
app.get('/students', async (req, res) => {
  try {
    await connectToDatabase();
    const students = await StudentList.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
});

app.post('/students', async (req, res) => {
  try {
    await connectToDatabase();
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

app.get('/hello', async (req, res) => {
  res.json({ message: 'Hello from Node backend!' });
});

// Export the serverless handler
module.exports.handler = serverless(app);


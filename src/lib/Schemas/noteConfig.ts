import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  _id: String, // custom ID like 'notes.txt'
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  tags: [String]
});

module.exports = mongoose.model('Note', noteSchema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date.now,
  },
});

module.exports = mongoose.model('notes',NoteSchema)

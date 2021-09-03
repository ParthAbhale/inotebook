const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date.now,
  },
});

module.exports = mongoose.model('auths',AuthSchema)

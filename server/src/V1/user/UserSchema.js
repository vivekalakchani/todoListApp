const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  token: { type: String },

  timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const Token = new mongoose.Schema({
  value: { type: String, unique: true, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Token', Token);

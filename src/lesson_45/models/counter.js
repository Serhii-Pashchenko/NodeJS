const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    default: 1,
  },
});

module.exports = mongoose.model('Counter', counterSchema);

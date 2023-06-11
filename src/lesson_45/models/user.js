const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  tokenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token',
  },
});

module.exports = mongoose.model('User', userSchema);

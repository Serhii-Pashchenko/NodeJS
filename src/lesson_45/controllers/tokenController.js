const Token = require('../models/token.js');
const User = require('../models/user.js');

class TokenController {
  async createToken(req, res) {
    const { value, user_id } = req.body;
    const newToken = new Token({
      value,
      user: user_id,
    });
    await newToken.save();
    const user = await User.findById(user_id);
    user.token = newToken._id;
    await user.save();
    res.json(newToken);
  }
  async getTokensByUser(req, res) {
    const id = req.query.id;
    const tokens = await Token.find({ user: id });
    res.json(tokens);
  }
  async deleteToken(req, res) {
    const id = req.params.id;
    const token = await Token.findByIdAndDelete(id);
    res.json(token);
  }
}

module.exports = new TokenController();

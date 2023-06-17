const User = require('../models/user.js');
const Token = require('../models/token.js');
const Counter = require('../models/counter.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

async function generateUserId() {
  const counter = await Counter.findOneAndUpdate(
    {
      _id: 'userId',
    },
    {
      $inc: { count: 1 },
    },
    {
      new: true,
      upsert: true,
    }
  );
  return counter.count;
}

const generateToken = (id, name) => {
  return jwt.sign({ id, name }, 'secret', {
    expiresIn: '1h',
  });
};

class userController {
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Невірні дані для створення користувача', errors });
      }
      const { name } = req.body;

      const newUser = new User({
        id: await generateUserId(),
        name,
      });
      await newUser.save();

      const value = generateToken(newUser.id, name);

      const newToken = new Token({
        value,
        user: newUser._id,
      });
      await newToken.save();

      newUser.tokenId = newToken._id;
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  }
  async updateUser(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    res.json(user);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    if (req.query.login === 'admin' && req.query.password === '12345') {
      const user = await User.findByIdAndDelete(id);
      await Token.deleteMany({ user: id });
      res.json(user);
    } else {
      res
        .status(403)
        .json({ success: false, message: 'Невірні дані для авторизації' });
    }
  }
}

module.exports = new userController();

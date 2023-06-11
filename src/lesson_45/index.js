const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const userRouter = require('./routes/userRouter');
const tokenRouter = require('./routes/tokenRouter');

app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/api', tokenRouter);
app.use(express.static(__dirname + '/public'));

mongoose
  .connect('mongodb://localhost:27017/usersdb', { useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, function () {
      console.log('Сервер запустився на порті ' + PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const express = require('express');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');

const port = 8080;

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', tokenRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
  console.log('Сервер запустився на порті ' + port);
});

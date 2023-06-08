const express = require('express');
// const fs = require('fs');
const userRouter = require('./routes/user.routes');
const tokenRouter = require('./routes/token.routes');

const port = 8080;

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', tokenRouter);

// const jsonParser = express.json();

app.use(express.static(__dirname + '/public'));

// const filePath = 'users.json';

// app.get('/api/users', (req, res) => {
//   const content = fs.readFileSync(filePath, 'utf8');
//   const users = JSON.parse(content);
//   res.send(users);
// });

// // отримання одного користувача по id
// app.get('/api/users/:id', (req, res) => {
//   const id = req.params.id; // получаем id
//   const content = fs.readFileSync(filePath, 'utf8');
//   const users = JSON.parse(content);
//   let user = null;
//   // знаходимо в масиві користувача по id
//   for (var i = 0; i < users.length; i++) {
//     if (users[i].id == id) {
//       user = users[i];
//       break;
//     }
//   }
//   // відправляємо користувача
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send();
//   }
// });

// // отримання відправлених даних
// app.post('/api/users', jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   const userName = req.body.name;
//   const userToken = req.body.token;
//   let user = { name: userName, token: userToken };

//   let data = fs.readFileSync(filePath, 'utf8');
//   let users = JSON.parse(data);

//   if (users.length !== 0) {
//     const id = Math.max.apply(
//       Math,
//       users.map(function (o) {
//         return o.id;
//       })
//     );
//     user.id = id + 1;
//   } else {
//     user.id = 1;
//   }

//   // додаємо користувача в масив
//   users.push(user);
//   data = JSON.stringify(users);
//   // перезаписуємо файл з новими даними
//   fs.writeFileSync('users.json', data);
//   res.send(user);
// });

// // видалення користувача по id
// app.delete('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   let data = fs.readFileSync(filePath, 'utf8');
//   let users = JSON.parse(data);
//   const account = users[id];
//   let index = -1;
//   // знаходимо індекс користувача в масиві
//   for (var i = 0; i < users.length; i++) {
//     if (users[i].id == id) {
//       index = i;
//       break;
//     }
//   }
//   if (
//     index > -1 &&
//     req.query.login === 'admin' &&
//     req.query.password === '12345'
//   ) {
//     // видаляємо користувача з масиву по індексу
//     const user = users.splice(index, 1)[0];
//     data = JSON.stringify(users);
//     fs.writeFileSync('users.json', data);
//     res.send(user);
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// });

// // зміна користувача
// app.put('/api/users', jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   const userId = req.body.id;
//   const userName = req.body.name;
//   const userToken = req.body.token;

//   let data = fs.readFileSync(filePath, 'utf8');
//   const users = JSON.parse(data);
//   let user;
//   for (var i = 0; i < users.length; i++) {
//     if (users[i].id == userId) {
//       user = users[i];
//       break;
//     }
//   }
//   if (user) {
//     user.token = userToken;
//     user.name = userName;
//     data = JSON.stringify(users);
//     fs.writeFileSync('users.json', data);
//     res.send(user);
//   } else {
//     res.status(404).send(user);
//   }
// });

app.listen(port, function () {
  console.log('Сервер запустився на порті ' + port);
});

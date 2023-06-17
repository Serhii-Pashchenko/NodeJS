const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const dataSize = 3 * 1024 * 1024;
function generateLargeData(size) {
  const data = '0'.repeat(size);
  return data;
}

io.on('connection', (socket) => {
  console.log('Новий клієнт підключився!');

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('Клієнт відключився!');
  });

  const data = generateLargeData(dataSize);

  socket.on('requestData', () => {
    console.log('Отримано запит на дані через WebSocket');
    socket.emit('data', data);
  });
});

app.get('/polling', (req, res) => {
  console.log('Отримано запит на дані через HTTP polling');
  const data = generateLargeData(dataSize);
  res.send(data);
});

http.listen(port, () => {
  console.log('Сервер запущено на http://localhost:', port);
});

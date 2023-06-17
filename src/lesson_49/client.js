const io = require('socket.io-client');
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Підключено до сервера! ', socket.id);
  socket.emit('chat message', 'Привіт, сервер!');
  socket.on('chat message', (data) => {
    console.log('Отримано від клієнта:', data);
  });
});

socket.on('disconnect', () => {
  console.log('Відключено від сервера! ', socket.id);
});

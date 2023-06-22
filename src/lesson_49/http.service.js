const { ServiceBroker } = require('moleculer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const dataSize = 3 * 1024 * 1024;
function generateLargeData(size) {
  const data = '0'.repeat(size);
  return data;
}

const httpService = {
  name: 'http',

  settings: {
    port,
  },

  started() {
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    app.get('/polling', (req, res) => {
      console.log('Отримано запит на дані через HTTP polling');
      const data = generateLargeData(dataSize);
      res.send(data);
    });

    app.listen(port, () => {
      console.log('HTTP-сервер запущено на http://localhost:', port);
    });
  },
};

const broker = new ServiceBroker();
broker.createService(httpService);
broker.start();

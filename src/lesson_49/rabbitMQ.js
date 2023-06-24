const { ServiceBroker } = require('moleculer');
const winston = require('winston');
const WinstonFile = require('winston-daily-rotate-file');
const WinstonRabbitmq = require('winston-rabbitmq');

const broker = new ServiceBroker();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new WinstonFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),

    new WinstonRabbitmq({
      level: 'error',
      connectionOptions: {
        protocol: 'amqp',
        hostname: 'rabbitmq.example.com',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/',
      },
      exchange: 'logs',
      exchangeType: 'fanout',
      routingKey: '',
      durable: false,
    }),
  ],
});

logger.transports.rabbitmq.on('error', (err) => {
  console.error('Помилка підключення до RabbitMQ:', err);
});

broker.createService({
  name: 'logger',
  logger,

  started() {
    this.logger.info('Це прикладове повідомлення');
    this.logger.warn('Це прикладове попередження');
    this.logger.error('Це прикладова помилка');
  },
});

broker.start().then(() => {
  console.log('Moleculer broker стартував');
});

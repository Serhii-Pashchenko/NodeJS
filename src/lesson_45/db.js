const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'test',
  password: 'test',
  port: 3000,
});

module.exports = pool;

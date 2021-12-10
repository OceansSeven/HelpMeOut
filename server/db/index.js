const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'helpmeout',
  user: (process.env.USER || 'postgres'),
  password: process.env.DB_PASSWORD
}

const pool = new Pool(config);

module.exports = pool;

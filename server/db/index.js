const { Pool } = require('pg');

// Include password in config if needed

const config = {
  host: 'localhost',
  port: 5432,
  database: 'helpmeout',
  user: (process.env.USER || 'postgres'),
}

const pool = new Pool(config);

module.exports = pool;

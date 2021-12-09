const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'helpmeout',
  user: (process.env.HOST || 'postgres'),
}
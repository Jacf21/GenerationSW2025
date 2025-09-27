const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tutorial_python',
  password: 'Guilder6494',
  port: 5434
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
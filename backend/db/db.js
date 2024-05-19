const { Pool } = require('pg');

const pool = new Pool({
  user: 'kelompok3',
  host: 'ep-dawn-truth-a53rt2y3.us-east-2.aws.neon.tech',
  database: 'finpro_3',
  password: 'V4kS0ZqREPgN',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;

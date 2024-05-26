const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/db');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const Pool = require('pg').Pool;
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM accounts WHERE name = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ success: true, message: 'Login successful', user });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

// Endpoint untuk mendapatkan data pengguna berdasarkan ID
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

app.put('/topup/:id', async (req, res) => {
  const userId = req.params.id; // mengambil userId dari URL parameter
  const { amount } = req.body; // mengambil amount dari body request

  try {
    const result = await pool.query('SELECT balance FROM accounts WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newBalance = parseFloat(result.rows[0].balance) + parseFloat(amount);

    await pool.query('UPDATE accounts SET balance = $1 WHERE id = $2', [newBalance, userId]);

    res.json({ success: true, message: 'Balance updated successfully', newBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.get('/getShoes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sepatu');
    res.status(200).json({ success: true, shoes: result.rows });
  } catch (error) {
    console.error('Error fetching shoes:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === '23505') { // unique_violation
      res.status(409).json({ success: false, message: 'Username already exists' });
    } else {
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db/db");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk login
app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM accounts WHERE name = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ success: true, message: "Login successful", user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Endpoint untuk mendapatkan data pengguna berdasarkan ID
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.put("/topup/:id", async (req, res) => {
  const userId = req.params.id; // mengambil userId dari URL parameter
  const { amount } = req.body; // mengambil amount dari body request

  try {
    const result = await pool.query(
      "SELECT balance FROM accounts WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newBalance = parseFloat(result.rows[0].balance) + parseFloat(amount);

    await pool.query("UPDATE accounts SET balance = $1 WHERE id = $2", [
      newBalance,
      userId,
    ]);

    res.json({
      success: true,
      message: "Balance updated successfully",
      newBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

/*app.get('/getShoes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sepatu');
    res.status(200).json({ success: true, shoes: result.rows });
  } catch (error) {
    console.error('Error fetching shoes:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
}); */

app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Simpan pengguna ke database
    const result = await pool.query(
      "INSERT INTO accounts (name, password, balance) VALUES ($1, $2, $3) RETURNING id, name",
      [name, password, 0]
    );

    // Ambil pengguna yang baru didaftarkan
    const user = result.rows[0];

    // Kirim respons sukses
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error registering user:", error);

    // Tangani kesalahan pelanggaran unik (username sudah ada)
    if (error.code === "23505") {
      // unique_violation
      res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    } else {
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  }
});

app.get("/shoes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT sepatu.nama,sepatu.harga,sepatu.gambar,stock_sepatu.size,stock_sepatu.jumlah FROM sepatu JOIN stock_sepatu ON sepatu.nama=$1 AND sepatu.nama=stock_sepatu.nama_sepatu LIMIT 100",
      [id]
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//api untuk list sepatu
app.get("/shoes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sepatu");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/shoes", async (req, res) => {
  const { name, brand, price } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const result = await pool.query(
      "INSERT INTO sepatu (nama, brand, harga) VALUES ($1, $2, $3) RETURNING *",
      [name, brand, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding shoe:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port zebbep ${PORT}`);
});

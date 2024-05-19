const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

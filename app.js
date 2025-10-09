// vulnerable-sql.js — intentionally vulnerable example
const express = require('express');
const mysql = require('mysql');

const app = express();
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  database: 'testdb'
});

app.get('/search', (req, res) => {
  const q = req.query.q; // user-controlled
  // <-- BAD: direct string interpolation into SQL (classic SQLi sink)
  const sql = `SELECT * FROM products WHERE name = '${q}'`;
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).send('error');
    res.json(rows);
  });
});

app.listen(3000, () => console.log('listening on 3000'));

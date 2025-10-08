// app.js (vulnerable example)
const express = require('express');
const app = express();
// assume `db.query(sql, cb)` runs SQL against a DB
// test code scanning
app.get('/search', (req, res) => {
  const q = req.query.q;
  // BAD: directly interpolating user input into SQL-like string
  const sql = `SELECT * FROM products WHERE name = '${q}'`;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).send('error');
    res.send(rows);
  });
});

app.listen(3000, () => console.log('listening on 3000'));

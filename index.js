const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve static HTML files from same folder

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oracle',
  database: 'testdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// CREATE
app.post('/users', (req, res) => {
  const { name, father, email, dob, empid } = req.body;
  const sql = 'INSERT INTO users (name, father, email, dob, empid) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, father, email, dob, empid], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// READ ALL
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// READ SINGLE
app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const { name, father, email, dob, empid } = req.body;
  const sql = 'UPDATE users SET name = ?, father = ?, email = ?, dob = ?, empid = ? WHERE id = ?';
  db.query(sql, [name, father, email, dob, empid, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

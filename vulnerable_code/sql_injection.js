// SQL Injection Vulnerability Example
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users_db'
});

// VULNERABLE: SQL Injection - User input directly concatenated into query
router.get('/user', (req, res) => {
  const userId = req.query.id;
  // Direct string concatenation - SQL Injection vulnerability
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// VULNERABLE: SQL Injection in login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Unsafe query construction
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// VULNERABLE: SQL Injection in search
router.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  // Template literal injection
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'`;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// VULNERABLE: Order by injection
router.get('/users/list', (req, res) => {
  const orderBy = req.query.sort || 'id';
  const query = "SELECT id, username, email FROM users ORDER BY " + orderBy;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;

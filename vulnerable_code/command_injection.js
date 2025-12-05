// Command Injection & Path Traversal Vulnerabilities
const express = require('express');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// VULNERABLE: Command Injection - User input passed directly to exec
router.get('/ping', (req, res) => {
  const host = req.query.host;
  // Direct command injection vulnerability
  exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
});

// VULNERABLE: Command Injection in file operations
router.post('/convert', (req, res) => {
  const { inputFile, outputFormat } = req.body;
  // Unsanitized input in shell command
  const command = `convert ${inputFile} output.${outputFormat}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'Conversion failed' });
    }
    res.json({ success: true, output: `output.${outputFormat}` });
  });
});

// VULNERABLE: Command Injection with execSync
router.get('/lookup', (req, res) => {
  const domain = req.query.domain;
  try {
    // Synchronous command execution with user input
    const result = execSync(`nslookup ${domain}`).toString();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Lookup failed' });
  }
});

// VULNERABLE: Path Traversal - No path sanitization
router.get('/file', (req, res) => {
  const filename = req.query.name;
  // Direct path concatenation without sanitization
  const filePath = './uploads/' + filename;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.send(data);
  });
});

// VULNERABLE: Path Traversal in file download
router.get('/download', (req, res) => {
  const file = req.query.file;
  // Vulnerable to ../../../etc/passwd style attacks
  const fullPath = path.join(__dirname, 'documents', file);
  res.download(fullPath);
});

// VULNERABLE: Arbitrary file write
router.post('/upload', (req, res) => {
  const { filename, content } = req.body;
  // No validation on filename - can write anywhere
  fs.writeFileSync(`./data/${filename}`, content);
  res.json({ success: true, path: `./data/${filename}` });
});

// VULNERABLE: SSRF - Server-Side Request Forgery
const axios = require('axios');

router.get('/fetch', async (req, res) => {
  const url = req.query.url;
  try {
    // Fetching arbitrary URLs without validation
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

// VULNERABLE: Insecure Deserialization
router.post('/deserialize', (req, res) => {
  const serializedData = req.body.data;
  try {
    // Using eval for deserialization - extremely dangerous
    const data = eval('(' + serializedData + ')');
    res.json({ result: data });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

module.exports = router;

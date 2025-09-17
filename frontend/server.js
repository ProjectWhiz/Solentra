const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Make sure all routes load index.html (for single-page apps)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend dev server running at http://localhost:${port}`);
});

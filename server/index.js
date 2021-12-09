const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Set up routes
app.use('/api/',router);

app.get('*', (req, res) => {
  console.log(`responding to ${req.url}`);
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

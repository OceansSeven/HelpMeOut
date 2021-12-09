const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Set up routes
app.use(router);

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

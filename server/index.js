require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routes');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig.js")(passport);

// Set up routes

app.use('/api/',router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

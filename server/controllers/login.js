const pool = require('../db');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

module.exports = {
  authenticateUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  },
  getLoggedInUser: (req, res) => {
    console.log('req.user: ', req.user);
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  }
};
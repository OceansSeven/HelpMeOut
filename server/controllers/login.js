const pool = require('../db');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

module.exports = {
  authenticateUser: (req, res, next) => {
    console.log('login req.body: ', req.body)
    passport.authenticate("local", (err, user, info) => {
      console.log('login user: ', user)
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
  }
};
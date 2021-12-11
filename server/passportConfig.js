const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const pool = require('./db');

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      pool.query('select * from users where email = $1', [username], (err, data) => {
        var user = data.rows[0];
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    pool.query('SELECT * FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
      if(err) {
        console.error('Error when selecting user on session deserialize', err)
        return cb(err)
      }

      cb(null, results.rows[0])
    })
  });
};
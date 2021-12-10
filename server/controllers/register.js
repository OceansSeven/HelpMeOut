const bcrypt = require("bcryptjs");
const pool = require('../db');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

module.exports = {
  registerUser: (req, res) => {
    console.log('req.body: ', req.body)
    const { email, password, contractor, firstName, lastName, company } = req.body;
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], async (err, results) => {
      if (err) throw err;
      if (results.rows.length === 1) res.send("User Already Exists");
      if (results.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const queryStr = `INSERT INTO 
                            users (email, password, contractor, firstname, lastname, company) 
                          VALUES ($1, $2, $3, $4, $5, $6)`
  
        pool.query(queryStr, [email, hashedPassword, contractor, firstName, lastName, company], (err, results) => {
          if (err) { 
            console.error('error inserting new user: ', err);
          } else {
            res.send("User Created");
          }
        })
      }
    })
  }
};
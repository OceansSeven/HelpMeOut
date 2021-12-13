const pool = require('../db');

module.exports = {
  getContractors: (req, res) => {

    pool.query(`SELECT
     id,
     company,
     firstName,
     lastName,
     email,
     rating,
     specialties,
     certifications,
     tools
     FROM users WHERE contractor = true ORDER BY rating DESC NULLS LAST`)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log(err);
    })

  },
};

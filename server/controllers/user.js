const pool = require('../db');

module.exports = {
  getUser: (req, res) => {
    const user_id = req.params.user_id;
    const sql = `SELECT id user_id, company, firstName, lastName, email, contractor, specialties, certifications, tools from users where id = $1`;
    const values = [user_id]
    pool.query(sql, values)
    .then (({rows}) => {
      res.status(200).send(rows)
    })
    .catch(err => {
      res.status(400).send(err)
    })

  },

  postUser: (req, res) => {

  },

  editUser: (req, res) => {

  },
};

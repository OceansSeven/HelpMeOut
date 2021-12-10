const pool = require('../db');

module.exports = {
  getMessages: (req, res) => {
    const userId = req.params.user_id;
    const sql = `SELECT
      messages.id,
      users.firstName from_firstName,
      users.lastName from_lastName,
      messages.body,
      messages.date
    FROM messages INNER JOIN users
    ON users.id = messages.from_id
    WHERE to_id = $1;`;
    const values = [userId];

    pool.query(sql, values)
      .then(({ rows }) => res.status(200).send(rows))
      .catch(err => res.status(400).send(err))
  },

  postMessage: (req, res) => {

  },
};

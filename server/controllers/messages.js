const pool = require('../db');

module.exports = {
  getMessages: (req, res) => {
    const userId = Number(req.params.user_id);
    console.log(userId);
    const sql = `SELECT * FROM messages WHERE to_id = $1;`;
    const values = [userId];

    pool.query(sql, values)
      .then(({ rows }) => res.status(200).send(rows))
      .catch(err => res.status(400).send(err))
  },

  postMessage: (req, res) => {

  },
};

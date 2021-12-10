const pool = require('../db');

module.exports = {
  getMessages: (req, res) => {
    console.log('going to get messages')
    const userId = req.query.user_id;
    const recipientId = req.query.recepient_id
    const sql = `SELECT
      messages.id,
      messages.from_id from_id,
      users.firstName from_firstName,
      users.lastName from_lastName,
      users.firstName to_firstName,
      users.lastName to_lastName,
      messages.body,
      messages.date
    FROM messages INNER JOIN users
    ON users.id = messages.from_id
    WHERE (to_id = $1 AND from_id =$2) OR (from_id = $1 AND to_id = $2);`;
    const values = [userId, recipientId];

    pool.query(sql, values)
      .then(({ rows }) => res.status(200).send(rows))
      .catch(err => res.status(400).send(err))
  },

  postMessage: (req, res) => {
    const sql = `INSERT INTO
    messages (from_id, to_id, body, date)
    VALUES ($1, $2, $3, $4);`;
    const values = [req.body.from, req.body.to, req.body.body, req.body.date];

    pool.query(sql, values)
      .then(() => {
        res.status(201).send('posted');
      })
      .catch(err => res.status(500).send(err));

  },
};

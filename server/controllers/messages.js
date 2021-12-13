const pool = require('../db');

module.exports = {
  getUserMessages: (req, res) => {
    const sql = `SELECT
      id,
      firstname,
      lastname
    FROM users
    WHERE id IN (
      SELECT DISTINCT from_id
      FROM messages
      WHERE to_id = $1
    ) AND id IN (
      SELECT DISTINCT to_id
      FROM messages
      WHERE from_id = $1
    ) ORDER BY firstname ASC;`;
    const values = [req.params.id];
    pool
      .query(sql, values)
      .then(({ rows }) => res.status(200).send(rows))
      .catch((err) => res.status(400).send(err));
  },
  getMessages: (req, res) => {
    console.log('going to get messages');
    const userId = req.query.user_id;
    const recipientId = req.query.recepient_id;
    const sql = `SELECT
      messages.id,
      messages.from_id from_id,
      users.firstname from_firstname,
      users.lastname from_lastname,
      messages.body,
      messages.date
    FROM messages INNER JOIN users
    ON users.id = messages.from_id
    WHERE (to_id = $1 AND from_id =$2) OR (from_id = $1 AND to_id = $2)
    ORDER BY messages.id ASC;`;
    const values = [userId, recipientId];

    pool
      .query(sql, values)
      .then(({ rows }) => res.status(200).send(rows))
      .catch((err) => res.status(400).send(err));
  },

  postMessage: (req, res) => {
    const sql = `INSERT INTO
    messages (from_id, to_id, body, date)
    VALUES ($1, $2, $3, $4);`;
    const values = [req.body.from, req.body.to, req.body.body, req.body.date];

    pool
      .query(sql, values)
      .then(() => {
        res.status(201).send('posted');
      })
      .catch((err) => res.status(500).send(err));
  },
};

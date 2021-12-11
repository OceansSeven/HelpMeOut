const pool = require('../db');

module.exports = {
  getJobs: (req, res) => {
    const sql = `SELECT
       json_agg(
        json_build_object(
          'id', j.id,
          'title', j.title,
          'specialties', j.specialties,
          'description', j.description,
          'rate', j.price_per_hour,
          'date', j.date,
          'client', (
            select json_build_object(
              'client_id', u.id,
              'firstName', u.firstName,
              'lastName', u.lastName
            )
            from users u
            WHERE j.client_id = u.id
          )
        )
      ) jobs
    FROM jobsPosted j WHERE contractor_id = 0`;
    pool
      .query(sql)
      .then(({ rows }) => {
        res.send(rows[0].jobs);
      })
      .catch((err) => console.log);
  },

  postJobs: (req, res) => {
    let { client_id, title, description, specialties, date, price_per_hour } =
      req.body;
    const sArray = `ARRAY [${specialties.map((item, i) => "'" + item + "'")}]`;

    const sql = `INSERT INTO jobsPosted (client_id, title, specialties, description, completed, date, price_per_hour) VALUES (${client_id}, '${title}', ${sArray}, '${description}', FALSE, '${date}', ${price_per_hour})`;
    pool
      .query(sql)
      .then((result) => res.status(201).end())
      .catch((err) => console.log);
  },
};

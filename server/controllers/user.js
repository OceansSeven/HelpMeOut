const pool = require("../db");

module.exports = {
  getUser: (req, res) => {
    const user_id = req.params.user_id;
    const sql = `SELECT
      id user_id,
      company,
      firstname,
      lastname,
      email,
      contractor,
      specialties,
      certifications,
      tools,
      (SELECT
        array(
          SELECT json_build_object(
            'task_id', id,
            'title', title,
            'specialties', specialties,
            'description', description,
            'price_per_hour', price_per_hour,
            'date', date,
            'completed', completed,
            'contractor', (SELECT json_build_object(
              'id', id,
              'firstname', firstname,
              'lastname', lastname,
              'rating', rating,
              'jobsCompleted', jobs_completed
            ) FROM users WHERE users.id = jobsposted.contractor_id)
          ) FROM jobsposted WHERE client_id = $1
        ) AS client_tasks),
      (SELECT
        array(
          SELECT json_build_object(
            'client', (SELECT json_build_object(
              'id', id,
              'firstname', firstname,
              'lastname', lastname
            ) FROM users WHERE users.id = jp.client_id),
            'title', jp.title,
            'description', jp.description,
            'specialties', jp.specialties,
            'date', jp.date,
            'completed', jp.completed
          ) FROM jobsposted jp WHERE contractor_id = $1
        ) AS contractor_tasks)
    FROM users WHERE id = $1`;
    const values = [user_id];
    pool
      .query(sql, values)
      .then(({ rows }) => res.status(200).send(rows[0]))
      .catch((err) => res.status(400).send(err));
  },

  postUser: (req, res) => {},

  editUser: (req, res) => {
    const {
      firstname,
      lastname,
      contractor,
      company,
      specialties,
      tools,
      certifications,
      userId,
    } = req.body;
    pool
      .query(
        `UPDATE users SET firstname = $1, lastname = $2, contractor = $3, company = $4, specialties = $5, tools = $6, certifications = $7 WHERE id = $8`,
        [
          firstname,
          lastname,
          contractor,
          company,
          specialties,
          tools,
          certifications,
          userId,
        ]
      )
      .then((data) => res.status(201).send(data))
      .catch((err) => res.status(400).send(err));
  },
};

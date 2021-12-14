const pool = require('../db');

module.exports = {
  getJobs: (req, res) => {
    const sql = `SELECT
      coalesce(
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
                'firstname', u.firstname,
                'lastname', u.lastname
              )
              from users u
              WHERE j.client_id = u.id
          )
        )
      ), '[]'::json) AS jobs
    FROM jobsposted j WHERE contractor_id = 0`;
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

    const sql = `INSERT INTO jobsposted (client_id, title, specialties, description, completed, date, price_per_hour) VALUES (${client_id}, '${title}', ${sArray}, '${description}', FALSE, '${date}', ${price_per_hour})`;
    pool
      .query(sql)
      .then((result) => res.status(201).end())
      .catch((err) => console.log);
  },

  putJobs: (req, res) => {
    let sql = `UPDATE jobsPosted SET `;
    if (req.body.id ) {
      var {id} = req.body;
    };
    if (req.body.client_id ) {
      let {client_id} = req.body;
      sql = sql.concat(`client_id = ${client_id},`);

    };
    if (req.body.title ) {
      let {title} = req.body;
      sql = sql.concat(`title = '${title}',`);

    };
    if (req.body.specialties ) {
      let {specialties} = req.body;
      sql = sql.concat(`specialties = ARRAY [${specialties.map((item, i) => "'" + item + "'")}],`);

    };
    if (req.body.description ) {
      let {description} = req.body;
      sql = sql.concat(`description = '${description}',`);

    };
    if (req.body.price_per_hour ) {
      let {price_per_hour} = req.body;
      sql = sql.concat(`price_per_hour = ${price_per_hour},`);

    };
    if (req.body.completed ) {
      let {completed} = req.body;
      sql = sql.concat(`completed = ${completed},`);

    };
    if (req.body.contractor_id ) {
      let {contractor_id} = req.body;
      sql = sql.concat(`contractor_id = ${contractor_id},`);

    };
    if (req.body.date ) {
      let {date} = req.body;
      sql = sql.concat(`date = '${date}',`);

    };
    sql = sql.replace(/,\s*$/, "");
    sql = sql.concat(` WHERE id = ${id}`);
    console.log('sql', sql);
    pool
    .query(sql)
    .then((result) => {
      res.status(201).end()})
    .catch((err) => console.log(err));
  }
};


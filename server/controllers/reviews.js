const pool = require('../db');

module.exports = {
  postReview: async (req, res) => {
    const { jobId, clientId, contractorId, reviewRating, reviewBody,
      date, contractorRating, contractorJobs } = req.body;
    console.log(req.body);
    const newRating = ((contractorRating * contractorJobs) + reviewRating) / (contractorJobs + 1);

    const reviewSQL = 'INSERT INTO reviews (client_id, contractor_id, rating, body, date) VALUES ($1, $2, $3, $4, $5)';
    const reviewValues = [clientId, contractorId, reviewRating, reviewBody, date];

    const userSQL = 'UPDATE users SET rating = $1, jobs_completed = $2 WHERE id = $3';
    const userValues = [newRating, contractorJobs + 1, contractorId];

    const jobsSQL =  'UPDATE jobsPosted SET completed = true WHERE id = $1';
    const jobsValues = [jobId];

    const client = await pool.connect();

    try {
      const reviewRes = await client.query(reviewSQL, reviewValues);
      const userRes = await client.query(userSQL, userValues);
      const jobsRes = await client.query(jobsSQL, jobsValues);
      res.status(200).send([reviewRes.rows, userRes.rows, jobsRes.rows]);
    } catch (e) {
      res.status(400).end(e);
      throw e;
    } finally {
      client.release();
    }
  },
};

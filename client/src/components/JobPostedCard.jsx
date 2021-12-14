import React, { useContext, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppContext from "../hooks/context";

function JobPostedCard({data}) {
  const { user, reviewJob, setReviewJob } = useContext(AppContext);

  return (
    <Paper>
      <p style={{fontSize:'12px'}}>{data?.date}</p>
      <h3 > {data?.title} {data?.price_per_hour ? '$' + data?.price_per_hour + '/hr' : ''}</h3>
      <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
      <div>
        {data?.description}
      </div>
      <div>
        <Link to={`/job/edit/${data.task_id}`}>
          <button style={{float:'right'}}>Edit</button>
        </Link>
      </div>
      {!data.completed && data.contractor &&
        <Link to="/leaveAReview">
          <Button color="secondary" onClick={() => setReviewJob(data)}>Mark As Complete</Button>
        </Link>}
    </Paper>
  );
}

export default JobPostedCard;
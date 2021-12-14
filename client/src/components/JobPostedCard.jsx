import React, { useContext, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppContext from "../hooks/context";

function JobPostedCard({data}) {
  const { user, reviewJob, setReviewJob } = useContext(AppContext);

  return (
    <div>
      <Paper elevation={6}>
        <div className="detail-container">
          <p style={{fontSize:'12px'}}>{data?.date}</p>
          <h3 > {data?.title} {data?.price_per_hour ? '$' + data?.price_per_hour + '/hr' : ''}</h3>
          <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
          <div>
            {data?.description}
          </div>
          <div style={{alignSelf:'flex-end'}}>
          {!data.completed && data.contractor &&
            <Link to="/leaveAReview">
              <Button color="secondary" onClick={() => setReviewJob(data)}>Mark As Complete</Button>
            </Link>}
            <Link to={`/job/edit/${data.task_id}`}>
              <Button variant='contained' size='small'>Edit</Button>
            </Link>
          </div>
        </div>
      </Paper>
      <br/>
    </div>
  );
}

export default JobPostedCard;
import React, { useContext } from "react";
import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppContext from "../hooks/context";

function JobPostedCard({data}) {
  const { setReviewJob } = useContext(AppContext);

  return (
    <div>
      <Card >
        <div className="detail-container">
          <p style={{fontSize:'12px'}}>{data?.date}</p>
          <h3 > {data?.title} | {data?.price_per_hour ? '$' + data?.price_per_hour : ''}</h3>
          <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
          <div>
            {data?.description}
          </div>
          <div style={{alignSelf:'flex-end', padding:5}}>
          {!data.completed && data.contractor &&
            <Link to="/leaveAReview">
              <Button color="secondary" size="small" onClick={() => setReviewJob(data)}>Mark As Complete</Button>
            </Link>} {'\u00A0'}
            {data.completed ? null :
            <Link to={`/job/edit/${data.task_id}`}>
              <Button variant='contained' size='small'>Edit</Button>
            </Link>
            }
          </div>
        </div>
      </Card>
      <br/>
    </div>
  );
}

export default JobPostedCard;
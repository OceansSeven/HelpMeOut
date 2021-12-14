import React, { useContext, useState } from "react";
import { Paper } from "@material-ui/core";
import AppContext from "../hooks/context";
import {Link} from 'react-router-dom';

function JobPostedCard({data}) {
  const { user } = useContext(AppContext);



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
    </Paper>
  );
}

export default JobPostedCard;
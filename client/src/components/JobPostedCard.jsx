import React, { useContext, useState } from "react";
import { Paper } from "@material-ui/core";
import AppContext from "../hooks/context";

function JobPostedCard({data}) {
  const { user } = useContext(AppContext);

  return (
    <Paper>
      <p style={{fontSize:'12px'}}>{data?.date}</p>
      <h3 > {data?.title} {data?.price_per_hour ? '$' + data?.price_per_hour + '/hr' : '<None listed>'}</h3>
      <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
      <div>
        {data?.description}
      </div>
      <div>
        <button style={{float:'right'}}>Edit</button>
      </div>
    </Paper>
  );
}

export default JobPostedCard;
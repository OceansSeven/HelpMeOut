import React from "react";
import { Paper } from "@material-ui/core"

function JobCard({data}) {
  //
  return (
    <Paper>
      <h3> {data?.title}</h3>
      <h4> {data?.firstName} {data?.lastName}.</h4>
      <p>Category: {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
      <div>
        {data?.description}
      </div>
      <p>{data?.date}</p>
    </Paper>
  );
}

export default JobCard;
import React, {useContext, useState} from "react";
import { Paper } from "@material-ui/core";
import AppContext from "../hooks/context";

function JobAvailableCard({data}) {
  const user = useContext(AppContext).user;

  return (
    <Paper>
      <p style={{fontSize:'12px'}}>{data?.date}</p>
      <h3 > {data?.title} ${data?.rate}/hr</h3>
      <h5> {data?.client.firstname} {data?.client.lastname[0]}.</h5>
      <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
      <div>
        {data?.description}
      </div>
      <div>
        <button style={{float:'right'}}>Accept</button>
        <button style={{float:'right'}}>Contact</button>
      </div>
    </Paper>
  );
}

export default JobAvailableCard;
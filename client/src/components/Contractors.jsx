import React, {useEffect, useState} from "react";
import { Paper } from '@material-ui/core';
import StarRatings from "./StarRatings";

export default function Contractors({data}) {

  return (
    <Paper>
      <div>{data.firstname} {data.lastname}</div>
      <div>{data.company}</div>
      <div>{data.specialties ? data.specialties.map((specialty) => {
        <div>{specialty}</div>
      })
    :null}
      </div>
      <div>{data.certifications ? data.certifications.map((certification) => {
        <div>{certification}</div>

      })
      :null}
      </div>
      <div>{data.tools ? data.tools.map((tool) => {
        <div>{tool}</div>
      })
    :null}
      </div>
      <div><StarRatings rating={Number(data.rating)}/></div>
    </Paper>
  );
}
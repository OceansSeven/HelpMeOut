import React, {useEffect, useState} from "react";
import { Paper } from "@material-ui/core";
import axios from 'axios';

export default function Contractors({data}) {

  // function getContractorData(data) {
  //   axios.get('/api/contractors')
  //   .then((response) => {
  //     console.log(response);
  //   })
  // }
  console.log(data);

  return (
    <Paper variant="contained">
      <div>{data?.fist_name} {data.last_name}</div>
      <div>{data?.specialties?.map((specialty) => {
        <span>{specialty}</span>
      })}
      </div>
      <div>{data?.certifications?.map((certification) => {
        <span>{certification}</span>
      })}
      </div>
      <div>{data?.tools?.map((tool) => {
        <span>{tool}</span>
      })}
      </div>
      <div>{data?.rating}</div>
    </Paper>
  );
}
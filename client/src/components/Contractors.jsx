import React, {useEffect, useState} from "react";
// import { Paper } from '@mui/material/core';
import axios from 'axios';

export default function Contractors({data}) {

  // function getContractorData(data) {
  //   axios.get('/api/contractors')
  //   .then((response) => {
  //     console.log(response);
  //   })
  // }

  return (
    <div>Contractors</div>
    // <Paper variant="contained">
    //   <div>{data.firstName} {data.lastName}</div>
    //   <div>{data.contractorSpecialties.map((specialty) => {
    //     <span>{specialty}</span>
    //   })}
    //   </div>
    //   <div>{data.certifications.map((certification) => {
    //     <span>{certification}</span>
    //   })}
    //   </div>
    //   <div>{data.tools.map((tool) => {
    //     <span>{tool}</span>
    //   })}
    //   </div>
    //   <div>{data.rating}</div>
    // </Paper>
  );
}
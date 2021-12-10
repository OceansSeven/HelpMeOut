import React, {useEffect, useState} from "react";
import ListManager from './ListManager.jsx'
// import { Paper } from '@mui/material/core';
import axios from 'axios';

export default function Contractors(props) {
  // const [contractorID, setContractorID] = useState(0);
  // const [contractorFirstName, setContractorFirstName] = useState('');
  // const [contractorLastName, setContractorLastName] = useState('');
  // const [contractorCompanyname, setContractorCompanyname] = useState('');
  // const [contractorEmail, setContractorEmail] = useState('');
  // const [contractorRating, setContractorRating] = useState(0);
  // const [contractorSpecialties, setContractorSpecialties] = useState([]);
  // const [contractorCertifications, setContractorCertifications] = useState([]);
  // const [contractorTools, setContractorTools] = useState([]);

  function getContractorData(data) {
    axios.get('/api/contractors')
    .then((response) => {
      console.log(response);
    })
  }

  return (
    <Paper variant="contained">
      <div id="contractorcard">Contractors</div>
      <div>{data.firstName} {data.lastName}</div>
      <div>{data.contractorSpecialties.map((specialty) => {
        <span>{specialty}</span>
      })}
      </div>
      <div>{data.certifications.map((certification) => {
        <span>{certification}</span>
      })}</div>
      <div>{data.rating}</div>
    </Paper>
  );
}
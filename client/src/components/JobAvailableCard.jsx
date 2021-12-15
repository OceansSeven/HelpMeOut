import React, {useContext, useState} from "react";
import { Card, Button } from "@material-ui/core";
import AppContext from "../hooks/context";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {getUser} from '../utils';


function JobAvailableCard({data, setJobsAccepted}) {
  const user = useContext(AppContext).user;
  const [accepted, setAccepted] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(data.accepted);

  async function getAcceptedJobs() {
    await getUser(user.id)
    .then((results) => {
      setJobsAccepted(results.contractor_tasks);
    })
  }

  async function acceptJob(props) {
    await axios.put('/api/jobs', {contractor_id: user.id, id: data.id})
    .then((result) => {
      setAccepted(true);
      getAcceptedJobs();
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Card variant="outlined">
        <div className="detail-container">
          <p style={{fontSize:'12px'}}>{data?.date}</p>
          <h3 > {data?.title} | Budget: ${data?.price_per_hour}</h3>
          <h5> {data?.client.firstname} {data?.client.lastname[0]}.</h5>
          <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
          <div className="description-box">
            {data?.description}
          </div>
          <div style={{alignSelf:'flex-end'}}>
            {accepted ? null : alreadyAccepted ? null : <Button variant='contained' size='small' onClick={acceptJob}>Accept</Button>}
            <Link to={`/profile/${data.client.client_id}`}>
              <Button variant='contained' size='small'>Contact</Button>
            </Link>
          </div>
          <div>
            {accepted ? <span id ="jobacceptedbttn" style={{textAlign: 'center'}}>Job accepted!</span> : null}
          </div>
        </div>
      </Card>
      <br/>
    </div>
  );
}

export default JobAvailableCard;
import React, {useContext, useState} from "react";
import { Paper, Button } from "@material-ui/core";
import AppContext from "../hooks/context";
import { Link } from 'react-router-dom';
import axios from 'axios';


function JobAvailableCard({data}) {
  const user = useContext(AppContext).user;
  const [accepted, setAccepted] = useState(false);


  async function acceptJob() {
    await axios.put('/api/jobs', {contractor_id: user.id, id: data.id})
    .then(result => {
      setAccepted(true);
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Paper elevation={6}>
        <div className="detail-container">
          <p style={{fontSize:'12px'}}>{data?.date}</p>
          <h3 > {data?.title} ${data?.price_per_hour}/hr</h3>
          <h5> {data?.client.firstname} {data?.client.lastname[0]}.</h5>
          <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
          <div className="description-box">
            {data?.description}
          </div>
          <div style={{alignSelf:'flex-end'}}>
            {accepted ? null : <Button variant='contained' size='small' onClick={acceptJob}>Accept</Button>}
            <Link to={`/profile/${data.client.client_id}`}>
              <Button variant='contained' size='small'>Contact</Button>
            </Link>
          </div>
          <div>
            {accepted ? <span id ="jobacceptedbttn" style={{textAlign: 'center'}}>Job accepted!</span> : null}
          </div>
        </div>
      </Paper>
      <br/>
    </div>
  );
}

export default JobAvailableCard;
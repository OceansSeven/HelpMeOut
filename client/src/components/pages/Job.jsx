import React, {useContext, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import { Paper } from "@material-ui/core";
import { specialties, postJobs } from '../../utils';
import MainContext from '../../hooks/MainContext';
import JobPostedCard from '../JobPostedCard';
import AppContext from '../../hooks/context';

function Job() {

  //import context
  const {user, jobsPostedContext} = useContext(AppContext);

  console.log(jobsPostedContext);

  //form state vars
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price_per_hour, setPPH] = useState(0);
  const [specialtiesSelected, setSpecialtiesSelected] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [posted, setPosted] = useState(false);

  const location = useLocation();

  if (posted) {
    return (<Navigate to='/main'/>)
  }

  const formPage = (
  <Paper>
    <h2>Post a new listing</h2>
      <form>
        <label>Listing Title</label> <br/>
        <input type="text" placeholder='What you want contractors to see' style={inputStyle} onChange={e => setTitle(e.target.value)} value={title}/> <br/>
        <label>Hourly Rate</label> <br/>
        <input type="text" style={inputStyle} onKeyPress={(e) => {
          if(!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }} onChange={e => setPPH(e.target.value)} value={price_per_hour}/> <br/>
        <label>Describe the Job</label> <br/>
        <textarea type="text" maxLength="200" style={inputStyle} onChange={e => setDescription(e.target.value)} value={description} placeholder='200 characters or less'/> <br/>
        <label>Type of Work</label> <br/>
        {specialties.map((item, i) => {
          i+=1
          if (i % 3 === 0) {
            return (<span key={i}> <input type="checkbox" name={item} onClick={setCheckBoxes} defaultChecked={!!specialtiesSelected[item]}/> {item} <br/></span>)
          } else {
            return (<span key={i}> <input type="checkbox" name={item} onClick={setCheckBoxes} defaultChecked={!!specialtiesSelected[item]}/> {item} |</span>)
          }
          })}
          <br/>
          <button onClick={goToConfirm}>Post</button>
      </form>
  </Paper>
  );

  const confirmPage = (
  <Paper>
    <h3>
      Please confirm the following information is accurate:
    </h3>
    <br/>
    <h5>Listing Title:</h5>
    <div>{title}</div>
    <h5>Rate:</h5>
    <div>${price_per_hour}/hr</div>
    <h5>Description:</h5>
    <div>{description}</div>
    <h5>Type(s) of Work:</h5>
    <ul>
      {Object.keys(specialtiesSelected).map(item => <li key={item}>{item}</li>)}
    </ul>

    <button onClick={handleConfirm}>Confirm</button> <button onClick={handleEdit}>Edit</button>
  </Paper>
  );

  function setCheckBoxes(e){
    if (specialtiesSelected[e.target.name]) {
      delete specialtiesSelected[e.target.name];
    } else {
      specialtiesSelected[e.target.name] = true;
    }
  }

  function goToConfirm(e) {
    e.preventDefault();
    setConfirmation(true);
  }

  function handleEdit() {
    setConfirmation(false);
  }

  function handleConfirm(e) {
    e.preventDefault();
    postJobs({client_id: user.id, title, description, specialties: Object.keys(specialtiesSelected), date: new Date(), price_per_hour})

    setPosted(true);
  }

  const inputStyle = {
    width: '90%'
  };

  return (
    <div>
      {confirmation ? confirmPage : formPage}
    </div>
  )
}

export default Job;



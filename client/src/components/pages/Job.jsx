import React, {useContext, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import { Card, Button, Container} from "@material-ui/core";
import { specialties, postJobs, editJobs } from '../../utils';
import AppContext from '../../hooks/context';

function Job() {

  //import context
  const {user, jobsPostedContext} = useContext(AppContext);

  //form state vars
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price_per_hour, setPPH] = useState(0);
  const [specialtiesSelected, setSpecialtiesSelected] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [posted, setPosted] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  const location = useLocation();
  let split = location.pathname.split('/');
  let jobId = parseInt(split[split.length - 1]);

  if (location.pathname.includes('edit') && !hasRun) {

    for (let job of jobsPostedContext) {
      if (job.task_id === jobId){
        setHasRun(true);
        setEditMode(true);
        setTitle(job.title);
        setDescription(job.description);
        setPPH(job.price_per_hour);
        job.specialties.map(j => specialtiesSelected[j] = true);
        break;
      }
    }
  }

  if (posted) {
    return (<Navigate to='/main'/>)
  }

  const emptyComp = (<div style={{color: 'red'}}>
    Please make sure all fields are filled in.
  </div>);

  const formPage = (
  <Card>
    <h2 style={{padding:5, textAlign:'center'}}>Post a new listing</h2>
    <div style={{display: 'flex', justifyContent:'center', padding: 5}}>
      <form>
        <label>Listing Title</label> <br/>
        <input type="text" placeholder='What you want contractors to see' style={inputStyle} onChange={e => setTitle(e.target.value)} value={title}/> <br/>
        <label>Maximum Budget</label> <br/>
        <input type="text" style={inputStyle} onKeyPress={(e) => {
          if(!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }} onChange={e => setPPH(e.target.value)} value={price_per_hour}/> <br/>
        <label>Describe the Job</label> <br/>
        <textarea type="text" maxLength="200" style={inputStyle} onChange={e => setDescription(e.target.value)} value={description} placeholder='200 characters or less'/> <br/>
        <label>Type of Work</label> <br/>
        {specialties.map((item, i) => {
          if(item === 'All') {
            return;
          }
          if (i % 2 === 0 || i === specialties.length - 1) {
            return (<span key={i}> <input type="checkbox" name={item} onClick={setCheckBoxes} defaultChecked={!!specialtiesSelected[item]}/> {item} <br/></span>)
          } else {
            return (<span key={i}> <input type="checkbox" name={item} onClick={setCheckBoxes} defaultChecked={!!specialtiesSelected[item]}/> {item} |</span>)
          }
          })}
          <br/>
          {emptyFields ? emptyComp : null}
          <Button onClick={goToConfirm} variant='contained'>Post</Button>
          <br/>
      </form>
      <br/>
    </div>
  </Card>
  );

  const confirmPage = (
  <Card>
    <div style={{textAlign:'center', padding:5}}>
    <h3 >
      Please confirm the following information is accurate:
    </h3>
      <br/>
      <h5>Listing Title:</h5><br/>
      <div>{title}</div><br/>
      <h5>Max Budget:</h5><br/>
      <div>${price_per_hour}</div><br/>
      <h5>Description:</h5><br/>
      <div>{description}</div><br/>
      <h5>Type(s) of Work:</h5><br/>
      <ul>
        {Object.keys(specialtiesSelected).map(item => <li key={item}>{item}</li>)}
      </ul>
      <br/>

      <Button variant='contained' onClick={handleConfirm}>Confirm</Button> <Button variant='contained' onClick={handleEdit}>Edit</Button>
      <br/>
    </div>
  </Card>
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
    if (title && description && price_per_hour && Object.keys(specialtiesSelected).length) {
      setConfirmation(true);
    } else {
      setEmptyFields(true);
    }
  }

  function handleEdit() {
    setConfirmation(false);
  }

  function handleConfirm(e) {
    e.preventDefault();
    if(editMode) {
      editJobs({id: jobId, client_id: user.id, title, description, specialties: Object.keys(specialtiesSelected), date: new Date(), price_per_hour})
    } else {
      postJobs({client_id: user.id, title, description, specialties: Object.keys(specialtiesSelected), date: new Date(), price_per_hour})
    }
    setPosted(true);
  }

  const inputStyle = {
    width: '90%'
  };

  return (
    <Container>
      <br/>
      <div style={{padding:5}}>
        {confirmation ? confirmPage : formPage}
      </div>
    </Container>
  )
}

export default Job;



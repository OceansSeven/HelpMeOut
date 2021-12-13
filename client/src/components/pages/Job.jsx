import React, {useContext} from 'react';
import {useLocation} from 'react-router-dom';
import { Paper } from "@material-ui/core";
import { specialities } from '../../utils';

function Job() {
  const location = useLocation();

  const inputStyle = {
    width: '90%'
  };

  console.log(location.pathname)
  return (
    <div>
      <h2>Post a new listing</h2>
      <Paper>
        <form>
          <label>Listing Title</label> <br/>
          <input type="text" placeholder='What you want contractors to see' style={inputStyle}/> <br/>
          <label>Hourly Rate</label> <br/>
          <input type="text" style={inputStyle} onKeyPress={(e) => {
            if(!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}/> <br/>
          <label>Describe the Job</label> <br/>
          <textarea type="text" maxLength="200" style={inputStyle}/> <br/>
          <label>Type of Work</label> <br/>
          {specialities.map((item, i) => {
            i+=1
            if (i % 3 === 0) {
              return (<span key={i}> <input type="checkbox"/> {item} <br/></span>)
            } else {
              return (<span key={i}> <input type="checkbox"/> {item} |</span>)
            }
            })}
            <br/>
            <button>Post</button>
        </form>
      </Paper>

    </div>
  )
}

export default Job;
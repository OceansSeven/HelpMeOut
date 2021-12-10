import React, { useState, useContext } from 'react';
import JobCard from '../JobCard';
import ListManager from '../ListManager.jsx';

const Main = function Main() {

  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);


  //get jobs posted by user from API
  //  store results in state?

  //get jobs accepted by user from API

  //get contractors from API

  //get jobs available from API
  //    setJobsAvailable(results)



  //NOTE: We should create some type of interface that can toggle these lists dynamically, below is placeholder
  return (
    <div>
      <div className='userPosts'>
        <ListManager data={jobsPosted}>
          <JobCard/>
        </ListManager>
        <ListManager data={jobsAccepted}>
          <JobCard/>
        </ListManager>
      </div>
      <div className='searchList'>
        <ListManager data={contractorList}>
          {/*Contractor component goes here*/}
        </ListManager>
        <ListManager data={jobsAvailable}>
          <JobCard />
        </ListManager>
      </div>
    </div>
  );
};

export default Main;

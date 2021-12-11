import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard';
import ListManager from '../ListManager.jsx';
import AppContext from '../../hooks/context';
import { getContractors, getUser, getJobs } from '../../utils';

const Main = function Main() {
  const { userId } = useContext(AppContext);

  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);

  //get jobs posted by user from API
  useEffect(() => {
    getUser(userId).then((results) => {
      setJobsPosted(results.client_tasks);
      setJobsAccepted(results.contractor_tasks);
    })
    .catch(err => console.error(err));
    getContractors().then(setContractorList).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
  }, [])

  //NOTE: We should create some type of interface that can toggle these lists dynamically, below is placeholder
  return (
    <div>
      <div className='userPosts'>
        <ListManager data={jobsPosted}>
          <JobCard />
        </ListManager>
        <ListManager data={jobsAccepted}>
          <JobCard />
        </ListManager>
      </div>
      <div className='searchList'>
        {/* <ListManager data={contractorList}>
          Contractor component goes here
        </ListManager> */}
        <ListManager data={jobsAvailable}>
          <JobCard />
        </ListManager>
      </div>
    </div>
  );
};

export default Main;

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import JobAvailableCard from '../JobAvailableCard.jsx';
import JobPostedCard from '../JobPostedCard.jsx';
import ListManager from '../ListManager.jsx';
import Contractors from '../Contractors.jsx';
import AppContext from '../../hooks/context';
import { getContractors, getUser, getJobs } from '../../utils';

const Main = function Main() {
  const { user } = useContext(AppContext);
  console.log(user);


  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);

  //current userfeed -> defaults to client view
  //current searchFeed ->


  const userBtns = (<div><button>Posted</button> <button>Accepted</button></div>)

  //get jobs posted by user from API
  useEffect(() => {
    getUser(user.id).then((results) => {
      setJobsPosted(results.client_tasks);
      setJobsAccepted(results.contractor_tasks);
    })
    .catch(err => console.error(err));
    getContractors().then((results) => {
      setContractorList(results)}).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
  }, [])

  //NOTE: We should create some type of interface that can toggle these lists dynamically, below is placeholder
  return (
    <div>
      <div className='userPosts'>
        {user.contractor ? userBtns : null}
        {/*currentfeed === false ? jobsPosted : jobs accepted */}
        <ListManager data={jobsPosted}>
          <JobPostedCard />
        </ListManager>
        <ListManager data={jobsAccepted}>
          <JobPostedCard />
        </ListManager>
      </div>

      <div className='searchList'>
        <ListManager data={contractorList}>
          <Contractors />
        </ListManager>
        <ListManager data={jobsAvailable}>
          <JobAvailableCard />
        </ListManager>
      </div>
    </div>
  );
};

export default Main;

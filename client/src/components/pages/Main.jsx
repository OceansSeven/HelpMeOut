import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import JobAvailableCard from '../JobAvailableCard';
import JobPostedCard from '../JobPostedCard';
import ListManager from '../ListManager';
import Contractors from '../Contractors';
import AppContext from '../../hooks/context';
import MainContext from '../../hooks/MainContext';
import { getContractors, getUser, getJobs } from '../../utils';

const Main = function Main() {
  const { user } = useContext(AppContext);
  // console.log(user);

  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);

  // button states
  // show client view or contractor view
  const [showClient, setshowClient] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleButtonClick = (e) => {
    if (e.target.innerText === 'Client' || e.target.innerText === 'Contractor') {
      setshowClient(e.target.innerText === 'Client' ? true : false);
    } else {
      setShowCompleted(e.target.innerText.toLowerCase().includes('completed'));
    }
  }

  const userBtns = (
    <div>
      <button onClick={handleButtonClick}>
        Client
      </button>
      <button onClick={handleButtonClick}>
        Contractor
      </button>
    </div>);

  const clientFeed = (
    <>
      <div>
        <button onClick={handleButtonClick}>Jobs Posted</button>
        <button onClick={handleButtonClick}>Jobs Completed</button>
      </div>
      <div>
        <ListManager data={
          showCompleted ? jobsPosted.filter(j => j.completed) : jobsPosted.filter(j => !j.completed)
          }>
          <JobPostedCard />
        </ListManager>
      </div>
    </>
  );
  const contractorFeed = (
    <>
      <div>
        <button onClick={handleButtonClick}>Jobs Accepted</button>
        <button onClick={handleButtonClick}>Jobs Completed</button>
      </div>
      <div>
        <ListManager data={showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted}>
          {showCompleted ? <JobAvailableCard /> : <JobPostedCard />}
        </ListManager>
      </div>
    </>
  );

  //get jobs posted by user from API
  useEffect(() => {
    getUser(user.id).then((results) => {
      setJobsPosted(results.client_tasks);
      setJobsAccepted(results.contractor_tasks);
    })
    .catch(err => console.error(err));
    getContractors().then(setContractorList).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
  }, [])

  //NOTE: We should create some type of interface that can toggle these lists dynamically, below is placeholder
  return (
    <MainContext.Provider value={{
      jobsPosted
    }}>
      <div>
        <div style={{border: '1px solid black'}} className='userPosts'>
          {user.contractor ? userBtns : null}
          {showClient ? clientFeed : contractorFeed}
        </div>
        <div style={{border: '1px solid black'}} className='searchList'>
          <ListManager data={contractorList}>
            <Contractors />
          </ListManager>
          <ListManager data={jobsAvailable}>
            <JobAvailableCard />
          </ListManager>
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default Main;

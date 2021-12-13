import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import JobAvailableCard from '../JobAvailableCard';
import JobPostedCard from '../JobPostedCard';
import ListManager from '../ListManager';
import Contractors from '../Contractors';
import AppContext from '../../hooks/context';
import Search from '../Search.jsx';
import MainContext from '../../hooks/MainContext';
import { getContractors, getUser, getJobs } from '../../utils';

const Main = function Main() {
  const { user } = useContext(AppContext);

  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchFeedType, setSearchFeedType]  = useState('contractors')
  const [showClient, setshowClient] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const searchFeedButtons = (<div>
    <button onClick={() => { setSearchFeedData(contractorList); setSearchFeedType('contractors')}}>Contractors</button>
    <button onClick={() => { setSearchFeedData(jobsAvailable); setSearchFeedType('jobs')}}>Jobs Available</button>
  </div>);

  // button states
  // show client view or contractor view

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
        <button onClick={handleButtonClick}>Job(s) Posted</button>
        <button onClick={handleButtonClick}>Job(s) Completed</button>
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
        <button onClick={handleButtonClick}>Job(s) Accepted</button>
        <button onClick={handleButtonClick}>Job(s) Completed</button>
      </div>
      <div>
        <ListManager data={
          showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted.filter(j => !j.completed)
        }>
          <JobAvailableCard />
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
    getContractors().then((results) => {
      setSearchFeedData(results);
      setContractorList(results)
    }).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
  }, [])

  //NOTE: We should create some type of interface that can toggle these lists dynamically, below is placeholder
  return (
    <MainContext.Provider value={{
      jobsPosted,
      searchFeedData,
      setSearchFeedData,
      searchFeedType,
      jobsAvailable,
      contractorList,
    }}>
      <div>
        <div style={{border: '1px solid black'}} className='userPosts'>
          {user.contractor ? userBtns : null}
          {showClient ? clientFeed : contractorFeed}
        </div>
        <div style={{border: '1px solid black'}} className='searchList'>
          {user.contractor && searchFeedButtons}
          <Search feed={searchFeedData} searchType={searchFeedType} />
          {searchFeedType === 'contractors'
            ? (<ListManager data={searchFeedData}>
                <Contractors />
              </ListManager>)
            : (<ListManager data={searchFeedData}>
                <JobAvailableCard />
              </ListManager>)}
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default Main;

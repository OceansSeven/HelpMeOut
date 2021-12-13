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

  // set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchFeedType, setSearchFeedType]  = useState('contractors')
  const [showClient, setshowClient] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Define User Button Click Functionality
  const handleUserButtonClick = (e) => {
    if (e.target.innerText === 'Client' || e.target.innerText === 'Contractor') {
      setshowClient(e.target.innerText === 'Client' ? true : false);
    } else {
      setShowCompleted(e.target.innerText.toLowerCase().includes('completed'));
    }
  }

  // Define Search Feed Button Click Functionality
  const handleSearchFeedButtonsClick = (e) => {
    if (e.target.innerText === 'Contractors') { setSearchFeedData(contractorList); setSearchFeedType('contractors'); }
    if (e.target.innerText === 'Jobs Available') { setSearchFeedData(jobsAvailable); setSearchFeedType('jobs'); }
    setSearchTerm('');
  }

  // Define Search Feed Buttons
  const searchFeedButtons = (<div>
    <button onClick={handleSearchFeedButtonsClick} >Contractors</button>
    <button onClick={handleSearchFeedButtonsClick}>Jobs Available</button>
  </div>);

  // Define User Buttons
  const userBtns = (
    <div>
      <button onClick={handleUserButtonClick}>
        Client
      </button>
      <button onClick={handleUserButtonClick}>
        Contractor
      </button>
    </div>);

  // Define Client Feed HTML
  const clientFeed = (
    <>
      <div>
        <button onClick={handleUserButtonClick}>Jobs Posted</button>
        <button onClick={handleUserButtonClick}>Jobs Completed</button>
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

  // Define Contractor Feed HTML
  const contractorFeed = (
    <>
      <div>
        <button onClick={handleUserButtonClick}>Jobs Accepted</button>
        <button onClick={handleUserButtonClick}>Jobs Completed</button>
      </div>
      <div>
        <ListManager data={showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted}>
          {showCompleted ? <JobAvailableCard /> : <JobPostedCard />}
        </ListManager>
      </div>
    </>
  );

  // get jobs posted by user from API
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
      searchTerm,
      setSearchTerm,
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

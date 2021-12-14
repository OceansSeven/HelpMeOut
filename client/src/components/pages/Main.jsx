import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@material-ui/core";
import JobAvailableCard from '../JobAvailableCard';
import JobPostedCard from '../JobPostedCard';
import ListManager from '../ListManager';
import Contractors from '../Contractors';
import AppContext from '../../hooks/context';
import Search from '../Search.jsx';
import MainContext from '../../hooks/MainContext';
import { getContractors, getUser, getJobs } from '../../utils';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Main = function Main() {
  const { user, setJobsPostedContext } = useContext(AppContext);

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
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

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
    if (e.target.innerHTML === 'Contractors') { setSearchFeedData(contractorList); setSearchFeedType('contractors'); }
    if (e.target.innerHTML === 'Jobs Available') { setSearchFeedData(jobsAvailable); setSearchFeedType('jobs'); }
    setSearchTerm('');
    setSelectedSpecialty('All');
  }

  // Define Search Feed Buttons
  const searchFeedButtons = (<div className="searchFeedButtonsContainer">
    <Button className="searchFeedButton" variant="contained" color="primary" onClick={handleSearchFeedButtonsClick}>Contractors</Button>
    <Button className="searchFeedButton" variant="contained" color="primary" onClick={handleSearchFeedButtonsClick}>Jobs Available</Button>
  </div>);

  // Define User Buttons
  const userBtns = (
    <span>
      <button onClick={handleUserButtonClick}>
        Client
      </button>
      <button onClick={handleUserButtonClick}>
        Contractor
      </button>
    </span>);

  // Define Client Feed HTML
  const clientFeed = (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
        <Button onClick={handleUserButtonClick} variant="contained">Jobs Posted</Button>
        <Button onClick={handleUserButtonClick} variant="contained">Jobs Completed</Button>
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
        <ListManager data={
          showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted.filter(j => !j.completed)
        }>
          <JobAvailableCard setJobsAccepted={setJobsAccepted}/>
        </ListManager >
      </div>
    </>
  );

  // Get user data, jobs available, and contractors
  useEffect(() => {
    getUser(user.id).then((results) => {
      setJobsPosted(results.client_tasks);
      setJobsPostedContext(results.client_tasks);
      setJobsAccepted(results.contractor_tasks);
    })
    .catch(err => console.error(err));
    getContractors().then((results) => {
      setSearchFeedData(results);
      setContractorList(results)
    }).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
  }, [])

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
      selectedSpecialty,
      setSelectedSpecialty,
    }}>
      <div>
        <div style={{border: '1px solid black'}} className='userPosts'>
          <Link to='/job'>
            <button>Post a Job</button>
          </Link>
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

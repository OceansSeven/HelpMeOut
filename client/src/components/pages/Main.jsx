import React, { useState, useContext, useEffect } from 'react';
import { Button, Container } from "@material-ui/core";
import JobAvailableCard from '../JobAvailableCard';
import ListManager from '../ListManager';
import ContractorCard from '../ContractorCard';
import AppContext from '../../hooks/context';
import Search from '../Search.jsx';
import MainContext from '../../hooks/MainContext';
import { getContractors, getJobs } from '../../utils';
import { Link } from "react-router-dom";
import FeedPath from '../FeedPath';


const Main = function Main() {
  const { user, setFeedPath, feedPath } = useContext(AppContext);

  // set state necessary for API data
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchFeedType, setSearchFeedType]  = useState('contractors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Define Search Feed Button Click Functionality
  const handleSearchFeedButtonsClick = (e) => {
    if (e.target.innerHTML === 'Contractors') {
      setSearchFeedData(contractorList);
      setSearchFeedType('contractors');
      setFeedPath({ ...feedPath, 'mainView': e.target.innerHTML });
    }
    if (e.target.innerHTML === 'Jobs Available') {
      setSearchFeedData(jobsAvailable);
      setSearchFeedType('jobs');
      setFeedPath({ ...feedPath, 'mainView': e.target.innerHTML });
    }
    setSearchTerm('');
    setSelectedSpecialty('All');
  }

  // Define Search Feed Buttons
  const searchFeedButtons = (<div className="searchFeedButtonsContainer">
    <Button className="searchFeedButton" variant="contained" color="primary" onClick={handleSearchFeedButtonsClick}>Contractors</Button>
    <Button className="searchFeedButton" variant="contained" color="primary" onClick={handleSearchFeedButtonsClick}>Jobs Available</Button>
    <Link to={`/job`} style={{ textDecoration: 'none' }}>
      <Button className="searchFeedButton" variant="contained" color="primary">Post a Job</Button>
    </Link>
  </div>);

  // Get user data, jobs available, and contractors
  useEffect(() => {
    getContractors().then((results) => {
      setSearchFeedData(results);
      setContractorList(results)
    }).catch(err => console.error(err));
    getJobs().then(setJobsAvailable).catch(err => console.error(err));
    setFeedPath({ 'pagePath': 'Search', 'mainView': 'Contractors' });
  }, [])

  return (
    <MainContext.Provider value={{
      searchFeedData,
      setSearchFeedData,
      searchFeedType,
      jobsAvailable,
      contractorList,
      searchTerm,
      setSearchTerm,
      selectedSpecialty,
      setSelectedSpecialty,
      setJobsAccepted
    }}>
      {/* 56xp is the height of the app header bar */}
      <Container id="main" style={{height: `${window.innerHeight - 56}px`}}>
        <div id="main-title">
          <h2 style={{margin: '12px'}}>CLASSIFIEDS FEED</h2>
        </div>
        {user.contractor && searchFeedButtons}
        <Search feed={searchFeedData} searchType={searchFeedType} />
        <div id="feed-path">
          <FeedPath main={'search'} />
        </div>
        <div className='searchList'>
          {searchFeedType === 'contractors'
            ? (<ListManager id="main-feed" data={searchFeedData}>
                <ContractorCard />
              </ListManager>)
            : (<ListManager id="main-feed" data={searchFeedData}>
                <JobAvailableCard />
              </ListManager>)}
        </div>
      </Container>
    </MainContext.Provider>
  );
};

export default Main;

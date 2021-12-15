import React, { useState, useContext, useEffect } from 'react';
import { Button, Container } from "@material-ui/core";
import JobAvailableCard from '../JobAvailableCard';
import JobPostedCard from '../JobPostedCard';
import ListManager from '../ListManager';
import ContractorCard from '../ContractorCard';
import AppContext from '../../hooks/context';
import Search from '../Search.jsx';
import MainContext from '../../hooks/MainContext';
import { getContractors, getUser, getJobs } from '../../utils';
import { Link } from 'react-router-dom';

const Main = function Main() {
  const { user, setJobsPostedContext } = useContext(AppContext);

  // set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchFeedType, setSearchFeedType]  = useState('contractors')
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

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

  // Get user data, jobs available, and contractors
  useEffect(() => {
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
      <Container id="main">
        <h2 style={{margin: '12px'}}>CLASSIFIEDS FEED</h2>
        <Container className='searchList'>
          {user.contractor && searchFeedButtons}
          <Search feed={searchFeedData} searchType={searchFeedType} />
          {searchFeedType === 'contractors'
            ? (<ListManager data={searchFeedData}>
                <ContractorCard />
              </ListManager>)
            : (<ListManager data={searchFeedData} setJobsAccepted={setJobsAccepted}>
                <JobAvailableCard />
              </ListManager>)}
        </Container>
      </Container>
    </MainContext.Provider>
  );
};

export default Main;

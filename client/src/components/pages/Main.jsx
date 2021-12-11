import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import JobAvailableCard from '../JobAvailableCard';
import JobPostedCard from '../JobPostedCard';
import ListManager from '../ListManager';
import Contractors from '../Contractors';
import AppContext from '../../hooks/context';
import Search from '../Search.jsx';
import { getContractors, getUser, getJobs } from '../../utils';

const Main = function Main() {
  const { user } = useContext(AppContext);
  // console.log(user);


  //set state necessary for API data
  const [jobsPosted, setJobsPosted] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchFeedType, setSearchFeedType]  = useState('contractors')

  const userBtns = (<div><button>Client</button> <button>Contractor</button></div>);
  const searchFeedButtons = (<div>
    <button onClick={() => { setSearchFeedData(contractorList); setSearchFeedType('contractors')}}>Contractors</button>
    <button onClick={() => { setSearchFeedData(jobsAvailable); setSearchFeedType('jobs')}}>Jobs Available</button>
  </div>);

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
    <div>
      <div style={{border: '1px solid black'}} className='userPosts'>
        {user.contractor ? userBtns : null}
        {/* currentfeed === false ? jobsPosted : jobs accepted */}
        <ListManager data={jobsPosted}>
          <JobPostedCard />
        </ListManager>
        <ListManager data={jobsAccepted}>
          <JobPostedCard />
        </ListManager>
      </div>
      <div style={{border: '1px solid black'}} className='searchList'>
        <Search feed={searchFeedData} searchType={searchFeedType} />
        {user.contractor && searchFeedButtons}
        {searchFeedType === 'contractors'
          ? (<ListManager data={contractorList}>
              <Contractors />
            </ListManager>)
          : (<ListManager data={jobsAvailable}>
              <JobAvailableCard />
            </ListManager>)}
      </div>
    </div>
  );
};

export default Main;

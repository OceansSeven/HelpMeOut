import React, {useState, useContext, useEffect} from 'react';
import { Button, Container } from "@material-ui/core";
import AppContext from '../../hooks/context'
import JobPostedCard from '../JobPostedCard';
import JobAvailableCard from '../JobAvailableCard';
import ListManager from '../ListManager';
import { getUser } from '../../utils';
import { Link } from 'react-router-dom';
import FeedPath from '../FeedPath.jsx';

const Summary = function() {

  const { user, setJobsPostedContext, feedPath, setFeedPath } = useContext(AppContext);

  // state set from API
  const [jobsPosted, setJobsPosted] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);

  // page state
  const [showClient, setshowClient] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    getUser(user.id).then((results) => {
      setJobsPosted(results.client_tasks);
      setJobsPostedContext(results.client_tasks);
      setJobsAccepted(results.contractor_tasks);
    })
    .catch(err => console.error(err));
    setFeedPath({ 'pagePath': 'My Jobs', 'mainView': 'Client View', 'subMainView': 'Jobs Posted' })
  }, []);

  // helper function to render feed path
  const capitalizeFirst = (string) => (
    string
      .split(' ')
      .map(item => (item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase()))
      .join(' ')
  );

  // Define User Button Click Functionality
  const handleUserButtonClick = (e) => {
    if (e.target.innerText.toLowerCase() === 'client view' || e.target.innerText.toLowerCase() === 'contractor view') {
      setshowClient(e.target.innerText.toLowerCase() === 'client view' ? true : false);

      if (showCompleted) {
        setFeedPath({ ...feedPath, 'mainView': capitalizeFirst(e.target.innerText), 'subMainView': 'Jobs Completed' })
      } else if (e.target.innerText.toLowerCase() === 'Client View') {
        setFeedPath({ ...feedPath, 'mainView': capitalizeFirst(e.target.innerText), 'subMainView': 'Jobs Posted' });
      } else {
        setFeedPath({ ...feedPath, 'mainView': capitalizeFirst(e.target.innerText), 'subMainView': 'Jobs Accepted' });
      }

    } else if (e.target.innerHTML === 'Jobs Posted' || e.target.innerHTML === 'Jobs Completed' || e.target.innerHTML === 'Jobs Accepted') {
      setShowCompleted(e.target.innerText.toLowerCase().includes('completed'));
      setFeedPath({ ...feedPath, 'subMainView': e.target.innerHTML });
    }
  }

  // Define User Buttons
  const userBtns = (
    <div id="user-buttons">
      <span style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>
          Client View
        </Button>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>
          Contractor View
        </Button>
      </span>
    </div>
    );

  // Define Client Feed HTML
  const clientFeed = (
    <div id="feed-container">
      <div id="feed-buttons" style={{display: 'flex', justifyContent: 'center', margin: '10px 0px'}}>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>Jobs Posted</Button>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>Jobs Completed</Button>
        <Link to={`/job`} style={{ textDecoration: 'none' }}>
          <Button className="searchFeedButton" variant="contained" color="primary">Post a Job</Button>
        </Link>
      </div>
      <div id="feed-path">
        <FeedPath/>
      </div>
      <div id="summary-list-container">
        <ListManager id="summary-feed" data={
          showCompleted ? jobsPosted.filter(j => j.completed) : jobsPosted.filter(j => !j.completed)
        } srcList='client'>
          <JobPostedCard />
        </ListManager>
      </div>
    </div>
  );

  // Define Contractor Feed HTML
  const contractorFeed = (
    <div id="feed-container">
      <div id="feed-buttons" style={{display: 'flex', justifyContent: 'center', margin: '10px 0px'}}>
        <Button
          variant="contained"
          onClick={handleUserButtonClick}
          style={{margin: '0px 5px'}}>Jobs Accepted</Button>
        <Button
          variant="contained"
          onClick={handleUserButtonClick}
          style={{margin: '0px 5px'}}>Jobs Completed</Button>
      </div>
      <div id="feed-path">
        <FeedPath/>
      </div>
      <div id="summary-list-container">
        <ListManager id="summary-feed" data={
          showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted.filter(j => !j.completed)
        } srcList='contractor'>
          <JobAvailableCard/>
        </ListManager >
      </div>
    </div>
  );

  return (
    // 56xp is the height of the app header bar
    <Container id="summary" style={{height: `${window.innerHeight - 56}px`}}>
      <div id="summary-title">
        <h2 style={{margin: '12px'}}>SUMMARY FEED</h2>
      </div>
      {user.contractor && userBtns}
      {showClient ? clientFeed : contractorFeed}
      {/* <Container id='userPosts'> */}
      {/* </Container> */}
    </Container>
  );
}

export default Summary;
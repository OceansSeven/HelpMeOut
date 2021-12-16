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

  // Define User Button Click Functionality
  const handleUserButtonClick = (e) => {
    if (e.target.innerText.toLowerCase() === 'client view' || e.target.innerText.toLowerCase() === 'contractor view') {
      setshowClient(e.target.innerText.toLowerCase() === 'client view' ? true : false);

      if (showCompleted) {
        setFeedPath({ ...feedPath, 'mainView': e.target.innerText, 'subMainView': 'Jobs Completed' })
      } else if (e.target.innerText.toLowerCase() === 'Client View') {
        setFeedPath({ ...feedPath, 'mainView': e.target.innerText, 'subMainView': 'Jobs Posted' });
      } else {
        setFeedPath({ ...feedPath, 'mainView': e.target.innerText, 'subMainView': 'Jobs Accepted' });
      }

    } else if (e.target.innerHTML === 'Jobs Posted' || e.target.innerHTML === 'Jobs Completed' || e.target.innerHTML === 'Jobs Accepted') {
      setShowCompleted(e.target.innerText.toLowerCase().includes('completed'));
      setFeedPath({ ...feedPath, 'subMainView': e.target.innerHTML });
    }
  }

  // Define User Buttons
  const userBtns = (
    <span style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
      <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>
        Client View
      </Button>
      <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>
        Contractor View
      </Button>
    </span>);

  // Define Client Feed HTML
  const clientFeed = (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0px'}}>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>Jobs Posted</Button>
        <Button onClick={handleUserButtonClick} variant="contained" style={{margin: '0px 5px'}}>Jobs Completed</Button>
        <Link to={`/job`} style={{ textDecoration: 'none' }}>
          <Button className="searchFeedButton" variant="contained" color="primary">Post a Job</Button>
        </Link>
      </div>
      <FeedPath/>
      <div>
        <ListManager data={
          showCompleted ? jobsPosted.filter(j => j.completed) : jobsPosted.filter(j => !j.completed)
        } srcList='client'>
          <JobPostedCard />
        </ListManager>
      </div>
    </>
  );

  // Define Contractor Feed HTML
  const contractorFeed = (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0px'}}>
        <Button
          variant="contained"
          onClick={handleUserButtonClick}
          style={{margin: '0px 5px'}}>Jobs Accepted</Button>
        <Button
          variant="contained"
          onClick={handleUserButtonClick}
          style={{margin: '0px 5px'}}>Jobs Completed</Button>
      </div>
      <FeedPath />
      <div>
        <ListManager data={
          showCompleted ? jobsAccepted.filter(j => j.completed) : jobsAccepted.filter(j => !j.completed)
        } srcList='contractor'>
          <JobAvailableCard/>
        </ListManager >
      </div>
    </>
  );

  return (
    <Container id="summary">
      <h2 style={{margin: '12px'}}>SUMMARY FEED</h2>
      <Container className='userPosts'>
        {user.contractor && userBtns}
        {showClient ? clientFeed : contractorFeed}
      </Container>
    </Container>
  );
}

export default Summary;
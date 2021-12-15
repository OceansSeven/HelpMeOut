import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Messages from "./pages/Messages";
import ProfileView from "./Profile/ProfileView";
import Job from "./pages/Job";
import EditProfile from "./Profile/EditProfile";
import AppContext from "../hooks/context";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";
import LeaveAReview from "./LeaveAReview";
import AppBar from "./AppBar";
import MyProfile from "./Profile/MyProfile";
import MessagesList from "./pages/MessagesList";

const App = function App() {
  // user id which is passed into provider so all the app can use it
  // ########################################
  // TODO - set starting user to be null
  // right now the starting user will be 1 for testing purposes
  // ########################################
  const [user, setUser] = useState({certifications: [],
    company: "The Loose Cannons",
    contractor: true,
    email: "rj@hotmail.com",
    firstname: "Reginald",
    id: "8",
    jobs_completed: 0,
    lastname: "James",
    password: "$2a$10$rYtmcDHuXceZWxIc8ZKeJufvCdAJqR3Lv4RFwrbAd4KxRKL5hU6zC",
    rating: null,
    salt: null,
    specialties: [],
    tools: []});
  const [reviewJob, setReviewJob] = useState({completed: false,
    contractor: {id: 9, firstname: 'Gordon', lastname: 'Ramsey', rating: null, jobsCompleted: 0},
    date: "2021-12-15",
    description: "I made beignets and now my pipes are rusting, and theirs powdered sugar all over the place and my hips hurt",
    price_per_hour: 10000,
    specialties: (4) ['appliance repair', 'hvac', 'plumbing', 'electrical'],
    task_id: 14,
    title: "Beignet Bonanza"});
  const [jobsPostedContext, setJobsPostedContext] = useState([]);

  useEffect(() => {
    // axios call to get logged in user
    axios.get("/api/logged-in-user").then(({ data }) => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{
      // user id available to the whole app
      user,
      setUser,
      reviewJob,
      setReviewJob,
      jobsPostedContext,
      setJobsPostedContext
    }}>
      <Router>
        {user ? <AppBar /> : ""}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/main" element={user ? <Main /> : <Landing />} />
          <Route path="/messages" element={user ? <MessagesList /> : <Landing />}/>
          <Route path="/messages/:recepient" element={user ? <Messages /> : <Landing />} />
          <Route path="/job" element={user ? <Job/> : <Landing />} />
          <Route path="/job/:edit/:id" element={user ? <Job /> : <Landing />} />
          <Route path="/profile/:userID" element={user ? <ProfileView /> : <Landing />} />
          <Route path="/profile" element={user ? <MyProfile /> : <Landing />} />
          <Route path="/update" element={user ? <EditProfile /> : <Landing />} />
          <Route path="/leaveAReview" element={user ? <LeaveAReview /> : <Landing />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

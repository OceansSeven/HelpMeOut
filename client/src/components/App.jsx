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
  const [user, setUser] = useState(null);
  const [reviewJob, setReviewJob] = useState({});
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

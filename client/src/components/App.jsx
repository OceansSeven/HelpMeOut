import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Messages from "./pages/Messages";
import ProfileView from "./Profile/ProfileView";
import EditProfile from "./Profile/EditProfile";
import AppContext from "../hooks/context";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";
import LeaveAReview from "./LeaveAReview";

const App = function App() {
  // user id which is passed into provider so all the app can use it
  // ########################################
  // TODO - set starting user to be null
  // right now the starting user will be 1 for testing purposes
  // ########################################
  const [user, setUser] = useState({
    id: "2",
    company: "potatoMan",
    firstname: "Samwise",
    lastname: "Gamgee",
    contractor: true,
  });

  useEffect(() => {
    // axios call to get logged in user
    axios.get("/api/logged-in-user").then(({ data }) => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        // user id available to the whole app
        user,
        setUser,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/main" element={<Main />} />
          <Route path="/messages/:recepient" element={<Messages />} />
          <Route path="/profile/:userID" element={<ProfileView />} />
          <Route path="/update" element={<EditProfile />} />
          <Route path="/leaveAReview" element={<LeaveAReview />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

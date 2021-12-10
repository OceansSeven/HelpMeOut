import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Landing from './pages/Landing'
import Main from './pages/Main'
import Messages from './pages/Messages';
import ProfileView from './Profile/ProfileView';
import AppContext from '../hooks/context';

const App = function App() {
  // user id which is passed into provider so all the app can use it
  // ########################################
  // TODO - set starting user to be null
  // right now the starting user will be 1 for testing purposes
  // ########################################
  const [userId, setUserId] = useState(1)

  useEffect(() => {
    // axios call to get data
  }, []);

  return (
    <AppContext.Provider value={{
      // user id available to the whole app
      userId,
      setUserId
    }}>
      <Router>
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/main" element={<Main />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

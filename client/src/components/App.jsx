import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Landing from './pages/Landing'
import Main from './pages/Main'
import Messages from './pages/Messages';

const App = function App() {
  useEffect(() => {
    // axios call to get data
  }, []);

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/messages" element={<Messages />} />
        </Routes>
    </Router>
  );
};

export default App;

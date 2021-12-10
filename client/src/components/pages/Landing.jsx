import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contractors from '../Contractors';

const Landing = function Landing() {

  return (
    <div>
      <div>Landing</div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Contractors/>
    </div>
  );
};

export default Landing;

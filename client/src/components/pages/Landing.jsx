import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../hooks/context'

const Landing = function Landing() {

  return (
    <div>
      <div>Landing</div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  );
};

export default Landing;

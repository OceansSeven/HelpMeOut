import React from 'react';
import {Link} from 'react-router-dom';

const ErrorPage = function ErrorPage() {

  return (
    <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center', background: `linear-gradient(
      163deg,
      rgba(13, 19, 33, 1) 0%,
      rgba(116, 139, 171, 1) 43%,
      rgba(240, 235, 216, 1) 79%
    )`, width: '100vw', height: '100vh'}}>
      <h1 style={{color: 'red', marginTop:'30%'}}>Oops!</h1>
      <h3>Error 404- Page Not Found</h3>
      <h6>The page you requested could not be found. Return to main feed <Link to={`/main`}>here</Link></h6>
    </div>
  );
};

export default ErrorPage;

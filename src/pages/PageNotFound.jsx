import React from 'react';
import '../styles/pages/page-not-found.scss';

export default function PageNotFound() {
  return (
    <div className="page-not-found" role="main">
      <div className="flex-container vertical justify-center center-image">
        <div className="error-svg">
          <img src={require('../assets/images/404.svg')} alt="Not-Found" />
        </div>
        <p className="color-darkgray subtext">
          We were unable to find the page you were looking for.
        </p>
      </div>
    </div>
  );
}

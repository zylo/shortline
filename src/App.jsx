import React from 'react';
import { navigate, Link, Router } from '@reach/router';
import Introduction from './pages/Introduction';
import PageNotFound from './pages/PageNotFound';
import SecretPlatformPrototype from './pages/secretPlatformPrototype/SecretPlatformPrototype';

export default function App() {
  return (
    <div className="shortline-app">
      <header className="flex-container justify-between align-center app-header">
        <img
          className="app-logo"
          src={require('./assets/images/zylo_logo.png')}
          alt="Zylo logo"
          onClick={() => navigate('/')}
        />

        <ul className="flex-container align-center app-header-nav">
          <Link className="app-header-nav-item" to="/secret_prototype">
            Secret Prototype
          </Link>
        </ul>
      </header>

      <Router>
        <Introduction path="/" />
        <SecretPlatformPrototype path="secret_prototype" />
        <PageNotFound default />
      </Router>
    </div>
  );
}

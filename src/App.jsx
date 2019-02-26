import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import Introduction from './pages/Introduction';
import SecretPlatformPrototype from './pages/SecretPlatformPrototype';
import PageNotFound from './pages/PageNotFound';

class App extends React.Component {
  render() {
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
}

export default App;

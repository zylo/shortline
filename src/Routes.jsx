import React from 'react';
import { Router } from '@reach/router';
import { SelfDestructProvider } from './contexts/selfDestructContext';
import App from './App';

export default function Routes() {
  return (
    <SelfDestructProvider>
      <Router>
        <App path="/*" />
      </Router>
    </SelfDestructProvider>
  );
}

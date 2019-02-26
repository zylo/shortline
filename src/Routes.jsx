import React from 'react';
import { Router } from '@reach/router';
import App from './App';

export default function Routes() {
  return (
    <Router>
      <App path="/*" />
    </Router>
  );
}

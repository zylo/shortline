import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './App';

const store = configureStore();

export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App path="/*" />
        </Router>
      </Provider>
    );
  }
}

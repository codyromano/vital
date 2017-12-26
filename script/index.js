import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';

const AppWithRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

render(<AppWithRouter />, document.getElementById('root'));

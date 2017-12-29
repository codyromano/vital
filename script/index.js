import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from 'vital-components/App';
import ConfigureMusicPage from 'vital-components/ConfigureMusicPage';

const AppWithRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/configure-music" exact={true} component={ConfigureMusicPage} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

render(<AppWithRouter />, document.getElementById('root'));

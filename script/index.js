import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ConfigureMusicPage from 'vital-components/ConfigureMusicPage';
import ConfigureStatsPage from 'vital-components/ConfigureStatsPage';
import WorkOutPage from 'vital-components/WorkOutPage';
import ErrorPage from 'vital-components/ErrorPage';
import IntroPage from 'vital-components/IntroPage';
import ModelProvider from 'vital-components/ModelProvider';

const hydrateModel = () => Promise.resolve({
  // currentMPH: 0,
  targetMPH: 13,
  minSpeed: 0.20,
  // 50% faster than normal
  maxSpeed: 1.25,
  playbackRate: 0.40,
  // Default song info
  songId: 'bassnectar'
});

const AppWithRouter = () => (
  <ModelProvider hydrate={hydrateModel}>
    <HashRouter>
      <Switch>
        <Route path="/error/:errorType" exact={true} component={ErrorPage} />
        <Route path="/configure-music" exact={true} component={ConfigureMusicPage} />
        <Route path="/configure-stats" exact={true} component={ConfigureStatsPage} />
        <Route path="/work-out/:songId" exact={true} component={WorkOutPage} />
        <Route path="/work-out/:songId/mock" exact={true} component={WorkOutPage} />
        <Route path="/" component={IntroPage} />
      </Switch>
    </HashRouter>
  </ModelProvider>
);

render(<AppWithRouter />, document.getElementById('root'));

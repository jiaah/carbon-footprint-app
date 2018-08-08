import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router'; // eslint-disable-line
/* General */
import App from './app';
/* -- Import Components -- */
import HomeContainer from './src/containers/home.container';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="home" />
    <Route path="home" component={HomeContainer} />
  </Route>
);

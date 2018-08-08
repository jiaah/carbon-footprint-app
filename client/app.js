import React from 'react';
import 'babel-polyfill';
import './styles/main.scss';

const App = props => (
  <div id="wrapper">
    { props.children }
  </div>
);

export default App;

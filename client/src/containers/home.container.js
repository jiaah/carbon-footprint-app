import React from 'react';
import { connect } from 'react-redux';

/* -- Import Components -- */
import Home from './../components/home';


const HomeContainer = ({ resultLoading }) => (

  <Home
    resultLoading={resultLoading}
  />
);

const mapStateToProps = state => ({
  resultLoading: state.carbonFootprint.loading,
});

export default connect(mapStateToProps)(HomeContainer);

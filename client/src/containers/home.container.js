import React from 'react';
import { connect } from 'react-redux';

/* -- Import Components -- */
import Nav from '../components/nav';
import Footer from '../components/footer';
import FlightCalculatorContainer from './calculator/flight.calculator.container';
import Loader from '../components/loader';
import ErrorBoundary from './error.boundary.container';

const HomeContainer = ({ resultLoading }) => {
  if (resultLoading) {
    return (
      <Loader />
    );
  }
  return (
    <div>
      <Nav />
      {/* <ErrorBoundary> */}
        <FlightCalculatorContainer />
      {/* </ErrorBoundary> */}
      <Footer
        link="© 2017 - all rights reserved"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  resultLoading: state.carbonFootprint.loading,
});

export default connect(mapStateToProps)(HomeContainer);


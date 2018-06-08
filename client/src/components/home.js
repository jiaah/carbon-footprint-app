import React from 'react';

/* -- Import Components -- */
import Nav from './nav';
import Footer from './footer';
import FlightCalculatorContainer from '../containers/calculator/flight.calculator.container';
import Loader from './loader';
import ErrorBoundary from '../containers/error.boundary.container';


const Home = ({ resultLoading }) => {
  if (resultLoading) {
    return (
      <Loader />
    );
  }
  return (
    <div>
      <Nav />
      <ErrorBoundary>
        <FlightCalculatorContainer />
      </ErrorBoundary>
      <Footer
        link="© 2017 Flightnook- all rights reserved"
      />
    </div>
  );
};

export default Home;

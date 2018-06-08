import React from 'react';


const Footprint = ({ transportation, carbonFootprint }) => (

  <div className="f-regular ls-1 lh-2 pa3 result--border">
    <p>Total {transportation} Footprint =</p>
    <p><span className="main-blue result--p"> {carbonFootprint}</span> tonnes of CO2</p>
  </div>
);

export default Footprint;

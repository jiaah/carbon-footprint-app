import React from 'react';


const Header = ({ contents1, contents2, contents3 }) => (

  <div className="header--wrapper">
    <div className="header--image headings flex center-center lh-1 ls-1">
      <h1>{contents1}</h1>
      <h1>{contents2}</h1>
      <h1>{contents3}</h1>
    </div>
  </div>
);

export default Header;

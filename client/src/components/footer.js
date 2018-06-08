import React from 'react';

/* -- Import Components -- */
import Hr from '../components/hr';
import UI from '../components/ul';
import * as data from '../components/data';


const Footer = ({ link }) => (

  <footer className="bg-lightblack fw3">
    <div className="flex justify-center">
      <UI
        links={data.media}
      />
    </div>
    <Hr />
    <div className="tc footer--sec-section">
      <div className="footer--sec-section--flightnook">
        <a href="https://www.flightnook.com" rel="noopener noreferrer" target="_blank" className="white td-none lh-3">{link}</a>
      </div>
      <div className="lh-3 flex justify-center">
        <UI
          links={data.footerLinks}
        />
      </div>
    </div>
  </footer>
);

export default Footer;

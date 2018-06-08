import React from 'react';
import Modal from 'react-modal';


const Loader = () => (

  <Modal
    isOpen={true}
    ariaHideApp={false}
  >
    <div className="loader-container">
      <div className="loader">Loading...</div>
    </div>
  </Modal>
);


export default Loader;

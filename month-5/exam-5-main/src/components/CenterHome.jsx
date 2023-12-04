import React from 'react';
import HeroHome from './HeroHome';
import Navbar from './Navbar';

const CenterHome = () => {
  return (
    <div className='d-flex container-fluid'>
      <Navbar />

      <HeroHome />
    </div>
  );
}

export default CenterHome;

import React from 'react';
import HeroChannel from './HeroChannel';
import Navbar from './Navbar';

const CenterChannel = () => {
  return (
    <div className='d-flex container-fluid'>
      <Navbar />

      <HeroChannel />
    </div>
  );
}

export default CenterChannel;

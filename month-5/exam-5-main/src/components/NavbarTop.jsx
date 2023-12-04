import React from 'react';

const NavbarTop = () => {
  return (
    <div className=''>
      <ul className='navbar-nav justify-content-end flex-grow-1 ps-2 mb-3 gap-2 text-dark'>
        <li className='fw-bolder'>Home</li>
        <li>Trending</li>
        <li className='mb-4'>Subscriptions</li>
        <li>Library</li>
        <li>History</li>
        <li>Watch later</li>
        <li>Favourites</li>
        <li>Liked videos</li>
        <li>Music</li>
        <li>Games</li>
        <li>Show more</li>
      </ul>

      <h4>Subscriptions</h4>
    </div>

  );
}

export default NavbarTop;

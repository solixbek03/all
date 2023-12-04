import React from 'react';
import ImgOne from '../assets/Black.png'
import ImgTwo from '../assets/Menu.png'
import ImgThree from '../assets/CombinedShape.png'
import ImgFour from '../assets/Userpic.png'
import ImgFive from '../assets/phone-18.png'
import ImgSix from '../assets/ui-11.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='Header container-fluid'>
      <div className='container-fluid'>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex justify-content-between align-items-center gap-4 ">
            <img src={ImgTwo} alt="menu"/>

            <Link to={'/'}>
              <img src={ImgOne} alt='logo'/>
            </Link>

            <form className="d-flex align-items-center justify-content-between ms-5 col-10">
              <input className='form-control ' type="text" placeholder='Search' />
            </form>
          </div>

          <nav className='navbar'>
            <ul className='d-flex align-items-center justify-content-between list-unstyled mb-0'>
              <li className="header-item">
                <button className='border-0 bg-transparent'><img src={ImgFive} alt='streem'/></button>
              </li>

              <li className="header-item ms-3">
                <button className='border-0 bg-transparent'><img src={ImgThree} alt='dot hamb'/></button>
              </li>

              <li className="header-item ms-3">
                <button className='border-0 bg-transparent'><img src={ImgSix} alt='ring'/></button>
              </li>

              <li className="header-item ms-3">
                <button className='border-0 bg-transparent'><img src={ImgFour} alt='avatar' width={45} height={45}/></button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

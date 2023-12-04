import React  from 'react';
import Serch from '../assets/search.png'
import philip from '../assets/philip.png'
import flora from '../assets/flora.png'
import voilt from '../assets/voilt.png'
import Cover2 from '../assets/Cover2.png'

const HeroChannelUl = () => {
  return (
    <div>
      <div>
      <ul className='d-flex gap-5 list-unstyled mt-3'>
        <li className='fw-bolder'>Home</li>
        <li>Videos</li>
        <li>Playlists</li>
        <li>Channels</li>
        <li>Discussion</li>
        <li>About</li>
        <li><img src={Serch} alt="serch"  width={19}/></li>
      </ul>
    </div>

      <div className='d-flex'>
        <div className='d-flex gap-5'>
          <img className='w-100' src={Cover2} alt="" width={540} height={250}/>

          <div className='w-50'>
            <h5 className='pe-5'>Choosing The Best Audio Player Software For Your Computer</h5>

            <p className='fs-7 pe-5'>
            Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A common medium for advertising on the Internet is the use of banner ads. 
            </p>

            <p>11k views  ·  6 months ago</p>
          </div>
        </div>

        <div>
          <h4>Recommended channel</h4>

          <ul className=' list-unstyled mt-3'>
            <li className='d-flex align-items-center mt-3 pe-5'>
              <img src={flora} alt="" />

              <h6>Flora Benson</h6>
            </li>
            <li className='d-flex align-items-center mt-3 pe-5'>
              <img src={voilt} alt="" />

              <h6>Violet Cobb</h6>
            </li>
            <li className='d-flex align-items-center mt-3 pe-5'>
              <img src={philip} alt="" />

              <h6>Phillip Mullins</h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroChannelUl;

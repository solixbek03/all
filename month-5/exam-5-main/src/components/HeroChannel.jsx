import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cover from '../assets/Cover.png'
import oval from '../assets/Oval.png'


import Ui from '../assets/ui-11.png'
import HeroChannelUl from './HeroChannelUl';



const HeroChannel = () => {

  const [users, setUsers] = useState([])
  const [loaderF, setLoaderF] = useState(true)
  useEffect(() => {
    setLoaderF(true)
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data) =>  {
        setUsers(data)
        setLoaderF(false)
      })
      
  }, [])

  if (loaderF) {
    return (
      <div className="spinner-border text-danger mt-5 ms-5" role="status">
        <span className="visually-hidden"></span>
      </div>
    )
  }

  return (
    <div>
      <img src={Cover} alt="Cover"  width={1100}/>

      <div className='mt-4 d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <img className='rounded-circle' src={oval} alt=""  width={80} height={80}/>

          <div>
            <h5 className='h5'>dwada</h5>

            <p>245K subscribed</p>
          </div>
        </div>

        <div>
          <img src={Ui} alt="" />

          <button className='btn btn-danger px-3 rounded-5 ms-2'>Subscribe 2.3m</button>
        </div>
      </div>

      <HeroChannelUl />

      <h4>Videos</h4>

      <ul className=" list-unstyled mt-4 d-flex flex-nowrap gap-3">
        {
          users.slice(0, 6).map((user, i) => (
            <li key={user.id} className='card-item w-25  mb-3'>
              <Link to={`/video/${user.id}`} className='text-decoration-none text-dark'>
                <img className='card-img' src={user.url} alt={user.title} width={250} height={150}/>

                <h3 className="card-title fs-6">{user.title}</h3>

                <div className='d-flex align-items-center justify-content-between'>
                  <span className='card-span'>{`${i}k views`}</span>

                  <span className='card-span'>{`${user.albumId} days ago`}</span>

                  <span className='card-span'>{user.id}</span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default HeroChannel;

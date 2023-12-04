import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FirstAvatar from '../assets/Oval.png'
import FirstAvatarT from '../assets/OvalT.png'

const Hero = () => {
  const [users, setUsers] = useState([])
  const [loaderT, setLoaderT] = useState(true)
  useEffect(() => {
    setLoaderT(true)
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data) =>  {
        setUsers(data)
        setLoaderT(false)
      })
      
  }, [])


  if (loaderT) {
    return (
      <div className="spinner-border text-danger mt-5 ms-5" role="status">
        <span className="visually-hidden"></span>
      </div>
    )
  }

  return (
    <div className='container p5'>
      <div>
        <img src={FirstAvatar} alt="Dollie Blair" />
        <h4>Dollie Blair</h4>
      </div>

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

      <h4>Recommended</h4>

      <ul className=" list-unstyled mt-4 d-flex flex-nowrap gap-3">
        {
          users.slice(6, 9).map((user, i) => (
            <li key={user.id} className='card-item w-50  mb-3'>
              <Link to={`/video/${user.id}`} className='text-decoration-none text-dark'>
                <img className='card-img' src={user.url} alt={user.title} width={540} height={250}/>

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

      <div className='d-flex align-items-center gap-3'>
        <img src={FirstAvatarT} alt="Dollie Blair" />
        <h4>Food & Drink</h4>

        <p>Recommended channel for you</p>
      </div>

      <ul className=" list-unstyled mt-4 d-flex flex-nowrap gap-3">
        {
          users.slice(9, 15).map((user, i) => (
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

export default Hero;

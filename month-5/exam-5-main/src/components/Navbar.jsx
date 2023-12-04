import React, { useEffect, useState } from 'react';
import NavbarTop from './NavbarTop';
import settings from '../assets/Setting.png';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setLoader(true)
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data) =>  {
        setUsers(data)
        setLoader(false)
      })
  }, [setUsers])

  if (loader) {
    return (
      <div className="spinner-border text-primary mt-5 ms-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }



  return (
    <div className='w-25'>
      <NavbarTop />

      <ul className='navbar-nav flex-grow-1  mb-3 gap-2 text-dark'>
        {
          users.slice(0, 6).map((user) => (
            <li key={user.id} className='w-50'>
              <Link to={`/channel`} className='d-flex align-items-center gap-2 text-decoration-none text-secondary'>
                <img src={user.url} alt={user.title} width={26} height={26}/>

                <h3 className="card-title fs-6 ">{user.title}</h3>
              </Link>
            </li>
          ))
        }
      </ul>

      <img className='ms-5' src={settings} alt="settings" />
    </div>
  );
}

export default Navbar;

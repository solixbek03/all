import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import flora from '../assets/flora.png'

const Video = () => {
  let [down, setDown] = useState(false);
  let [content, setContent] = useState([]);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    setDown(true)
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((data) => {setUsers(data)
      setDown(false)})
    }, [])
  
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {setContent(data)})
      }, [])
  
      let { id } = useParams();
    console.log(id);

    if (down) {
      return (
        <div className="spinner-border text-danger mt-5 ms-5" role="status">
          <span className="visually-hidden"></span>
        </div>
      )
    }

  return (
    <div className='container d-flex'>
      <div className='wrapper-cont d-inline-block mt-5 w75'>
        {
          <div className='cont-item w-100 mb-3' key={content.id}>
            <Link className='direct-link text-decoration-none text-dark' to={`/video/${content.id}`}>
              <img className='card-img rounded-5' src={content.url} alt={content.title} width={700} height={500}/>

              <h3 className="item-title fs-2 fw-bold mt-2">{content.title}</h3>

              <div className='info-wrapper d-flex align-items-center'>
                <span className='info me-2'>{`${content.id}k views -`}</span>

                <span className='info'>{`${content.albumId} days ago`}</span>
              </div>
            </Link>
          </div>
        } 
        <div className='subscription mt-4 d-flex align-items-center'>
          <img className='user-img me-3' src={flora} alt='user' width={80} height={80}/>

          <div className='subscription-info-wrapper'>
            <span className='subscription-info h3 fw-bold m-0'>Food & Drink</span>

            <span className='subscription-info d-block m-0'>Published on 14 Jun 2019</span>
          </div>

          <button className='subscription-btn btn btn-danger px-4 py-3 rounded-5' type='button'>Subscribe 2.3m</button>
        </div>

        <p className='subscription-info mt-4'>
          A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad <br/> copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula <br/> to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the <br/> consumers mood when they see your ad. 
        </p>
      </div>
      <div className='videos-wrapper mt-5 d-inline-block ms-5'>
        <h3 className='heading'>Next</h3>
        <ul className=" list-unstyled mt-4  gap-3">
          {
            users.slice(6, 9).map((user, i) => (
              <li key={user.id} className='card-item w-75  mb-3'>
                <Link to={`/video/${user.id}`} className='text-decoration-none text-dark'>
                  <img className='card-img' src={user.url} alt={user.title} width={360} height={200}/>

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
    </div>
  )
}

export default Video;

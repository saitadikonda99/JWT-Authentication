import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import './css/Home.css'

function Home() {

  const handleLogout = useLogout();

  return (
        <div className="HomeComponent">
        <div className="HomeComponent-in">
          <div className="HomeComponent-in-head">
            <h1>Home Page</h1>
          </div>
          <div className="HomeComponent-in-body">
            <button onClick={handleLogout}>LogOut</button>
            <Link to='/user'>user</Link>
            <Link to='/profile'>profile</Link>
          </div>
        </div>
    </div>
  );
}

export default Home


import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

import './Home.css'

function Home() {

  const handleLogout = useLogout();

  return (
        <div className="HomeComponent">
            <div className="HomeComponent-in">
                <div className="Home-Nav">
                    <div className="Home-Nav-one">
                        <h1>Home Page</h1>
                    </div>
                    <div className="Home-Nav-two">
                        <Link to="/admin">Admin</Link>
                        <Link to='/login'>Login</Link>
                        <button onClick={handleLogout}>LogOut</button>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Home


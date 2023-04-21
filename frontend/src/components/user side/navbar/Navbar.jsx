import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { UilSignOutAlt } from "@iconscout/react-unicons"

function Navbar() {
  const history = useNavigate();
  const user_auth = getLocal();
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
    
  }


  const logout = () => {
    localStorage.removeItem('authToken')
    history('/login')
  }
  return (
    <div className='header-navbar'>
        <div className="brand">
            <div className="nav-container">
                <img src="" alt="" />
                Backpackers
            </div>
            <div className="toggle"></div>
        </div>
        <ul>
            <li><Link className='nav-item' to="/">Home</Link></li>
            <li><Link className='nav-item' to="/resorts-list">Resorts</Link></li>
            <li><Link className='nav-item' to="/adventures">Adventures</Link></li>
            <li><Link className='nav-item' to="/destinations">Destinations</Link></li>
        </ul>
        { user_auth && user_name.is_staff ? <Link to='/admin-dashboard'><button className='login-btn'>Admin</button></Link> : null}
        {user_auth ? <div className='nav-right-group'><h3>{user_name.username}</h3><UilSignOutAlt onClick={logout} /></div> : <Link to='/login'><button className='login-btn'>Login</button></Link>}
         
    </div>
  )
}

export default Navbar
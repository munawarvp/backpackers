import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { UilSignOutAlt } from "@iconscout/react-unicons"
import { MdHomeWork } from 'react-icons/md'
import { BsFillBuildingFill } from 'react-icons/bs'
import { FaHiking } from 'react-icons/fa'
import { HiLocationMarker, HiUserCircle } from 'react-icons/hi'

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

  const userProfile = () => {
    const token = getLocal();
    if (token){
      const {username} = jwtDecode(token)
      console.log(username)
      history(`/user-profile/${username}`)
    }
  }
  return (
    <div className='header-navbar'>
        <div className="brand" onClick={()=>history('/')}>
            <div className="nav-container">
                <img src="" alt="" />
                Backpackers
            </div>
            <div className="toggle"></div>
        </div>
        <ul>
            <li><Link className='nav-item' to="/"><MdHomeWork/> Home</Link></li>
            <li><Link className='nav-item' to="/resorts-list"><BsFillBuildingFill/>  Resorts</Link></li>
            <li><Link className='nav-item' to="/adventure-list"><FaHiking/> Adventures</Link></li>
            <li><Link className='nav-item' to="/destination-list"><HiLocationMarker/> Destinations</Link></li>
        </ul>
        { user_auth && user_name.is_staff ? <Link to='/admin-dashboard'><button className='login-btn'>Admin</button></Link> : null}
        {user_auth ? <div className='nav-right-group'><div onClick={userProfile} style={{display:"flex", alignItems:"center", gap:"5px"}}><HiUserCircle size={37}/><h3>{user_name.username}</h3></div>  <UilSignOutAlt onClick={logout} /></div> : <Link to='/login'><button className='login-btn'>Login</button></Link>}
         
    </div>
  )
}

export default Navbar
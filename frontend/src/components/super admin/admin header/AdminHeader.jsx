import React from 'react'
import './adminheader.css'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { CgProfile } from "react-icons/cg"

function AdminHeader() {
    const token = getLocal();
    const decoded = jwtDecode(token)
    const user = decoded.username
  return (
    <div className='header-div'>
        <div className='header-left'>
            <h1>Super Admin</h1>
            <input className='user-search' type="text" placeholder='Search User'/>
        </div>
        <div className="header-right">
            <h3 className='user-name-header'>{user}</h3>
            <CgProfile size={35}/>
        </div>
    </div>
  )
}

export default AdminHeader
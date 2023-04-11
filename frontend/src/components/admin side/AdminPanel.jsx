import React from 'react'
import './css/adminpanel.css'
import Sidebar from './sidebar/Sidebar'
import MainDash from './maindash/MainDash'
import RightSide from './rightside/RightSide'

function AdminPanel() {
  return (
    <div className='admin-panel'>
        <div className="app-glass">
            <Sidebar/>
            <MainDash/>
            <RightSide/>
        </div>
    </div>
  )
}

export default AdminPanel
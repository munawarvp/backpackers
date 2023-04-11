import React from 'react'
import './css/adminpanel.css'
import Sidebar from './sidebar/Sidebar'
import ResortList from './maindash/resorts list/ResortList'

function ResortPage() {
  return (
    <div className='admin-panel'>
        <div className="app-glass">
            <Sidebar/>
            <ResortList/>
        </div>
    </div>
  )
}

export default ResortPage
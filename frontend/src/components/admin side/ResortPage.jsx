import React from 'react'
import Sidebar from './sidebar/Sidebar'
import ResortList from './maindash/resorts list/ResortList'
import './maindash/adventure list/adventurelist.css'

function ResortPage() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <ResortList/>
        </div>
    </div>
  )
}

export default ResortPage
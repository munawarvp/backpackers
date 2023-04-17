import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './maindash/adventure list/adventurelist.css'
import DestinationList from './maindash/destination list/DestinationList'

function DestinationPage() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <DestinationList/>
        </div>
    </div>
  )
}

export default DestinationPage
import React from 'react'
import Sidebar from './sidebar/Sidebar'
import AdventueList from './maindash/adventure list/AdventueList'
import './maindash/adventure list/adventurelist.css'

function AdventurePage() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <AdventueList/>
        </div>
    </div>
  )
}

export default AdventurePage
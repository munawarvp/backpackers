import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './maindash/adventure list/adventurelist.css'
import AdventueList from './maindash/adventure list/AdventueList'

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
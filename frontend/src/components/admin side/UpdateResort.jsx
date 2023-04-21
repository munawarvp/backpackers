import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './maindash/adventure list/adventurelist.css'
import UpdateResortForm from './maindash/add resort/UpdateResortForm'

function UpdateResort() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <UpdateResortForm/>
        </div>
    </div>
  )
}

export default UpdateResort
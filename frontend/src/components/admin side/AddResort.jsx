import React from 'react'
import Sidebar from './sidebar/Sidebar'
import AddResortForm from './maindash/add resort/AddResortForm'
import './maindash/adventure list/adventurelist.css'

function AddResort() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <AddResortForm/>
        </div>
    </div>
  )
}

export default AddResort
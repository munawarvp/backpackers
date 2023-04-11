import React from 'react'
import Sidebar from './sidebar/Sidebar'
import AddResortForm from './maindash/add resort/AddResortForm'

function AddResort() {
  return (
    <div className='admin-panel'>
        <div className="app-glass">
            <Sidebar/>
            <AddResortForm/>
        </div>
    </div>
  )
}

export default AddResort
import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import UserResortList from '../../components/user side/user resort list/UserResortList'

function UserResortPage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <UserResortList/>
    </div>
  )
}

export default UserResortPage
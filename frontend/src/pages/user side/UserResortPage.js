import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import UserResortList from '../../components/user side/user resort list/UserResortList'
import Footer from '../../components/user side/footer/Footer'

function UserResortPage() {
  return (
    <div className='home-padding'>
      <Navbar />
      <UserResortList/>
      <Footer/>
    </div>
  )
}

export default UserResortPage
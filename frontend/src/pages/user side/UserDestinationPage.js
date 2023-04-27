import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import UserDestinationList from '../../components/user side/user resort list/UserDestinationList'
import Footer from '../../components/user side/footer/Footer'
import '../additional.css'

function UserDestinationPage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <UserDestinationList/>
        <Footer/>
    </div>
  )
}

export default UserDestinationPage
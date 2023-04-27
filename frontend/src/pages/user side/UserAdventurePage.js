import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import UserAdventureList from '../../components/user side/user resort list/UserAdventureList'
import Footer from '../../components/user side/footer/Footer'

function UserAdventurePage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <UserAdventureList/>
        <Footer/>
    </div>
  )
}

export default UserAdventurePage
import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import SingleAdventure from '../../components/user side/single resort/SingleAdventure'
import Footer from '../../components/user side/footer/Footer'

function SingleAdventurePage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <SingleAdventure/>
        <Footer/>
    </div>
  )
}

export default SingleAdventurePage
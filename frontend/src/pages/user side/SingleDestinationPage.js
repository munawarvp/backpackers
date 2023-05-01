import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import Footer from '../../components/user side/footer/Footer'
import SingleDestination from '../../components/user side/single resort/SingleDestination'

function SingleDestinationPage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <SingleDestination/>
        <Footer/>
    </div>
  )
}

export default SingleDestinationPage
import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import SingleResort from '../../components/user side/single resort/SingleResort'
import Footer from '../../components/user side/footer/Footer'

function SingleResortPage() {
  return (
    <div className='home-padding'>
        <Navbar/>
        <SingleResort/>
        <Footer/>
    </div>
  )
}

export default SingleResortPage
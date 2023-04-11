import React from 'react'
import Navbar from '../components/user side/navbar/Navbar'
import Header from '../components/user side/header/Header'
import Services from '../components/user side/services/Services'
import './additional.css'

function Home() {
  return (
    <div className='home-padding'>
      <Navbar/>
      <Header/>
      <Services/>
    </div>
  )
}

export default Home
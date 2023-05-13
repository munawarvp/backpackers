import React from 'react'
import Navbar from '../components/user side/navbar/Navbar'
import Header from '../components/user side/header/Header'
import './additional.css'
import Footer from '../components/user side/footer/Footer'
import Services from '../components/user side/services/Services'
import CustomerGalley from '../components/user side/customer gallery/CustomerGalley'

function Home() {
  return (
    <div className='home-padding'>
      <Navbar/>
      <Header/>
      <Services/>
      <CustomerGalley/>
      <Footer/>
    </div>
  )
}

export default Home
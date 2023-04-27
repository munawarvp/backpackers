import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import Footer from '../../components/user side/footer/Footer'
import CheckOut from '../../components/user side/booking checkout/CheckOut'

function CheckoutPage() {
    return (
        <div className='home-padding'>
            <Navbar />
            <CheckOut/>
            <Footer />
        </div>
    )
}

export default CheckoutPage
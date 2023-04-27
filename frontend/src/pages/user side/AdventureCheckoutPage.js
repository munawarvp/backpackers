import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import Footer from '../../components/user side/footer/Footer'
import AdventureCheckout from '../../components/user side/booking checkout/AdventureCheckout'

function AdventureCheckoutPage() {
    return (
        <div className='home-padding'>
            <Navbar />
            <AdventureCheckout/>
            <Footer />
        </div>
    )
}

export default AdventureCheckoutPage
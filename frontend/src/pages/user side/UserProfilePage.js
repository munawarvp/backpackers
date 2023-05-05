import React from 'react'
import Navbar from '../../components/user side/navbar/Navbar'
import UserProfile from '../../components/user side/user profile/UserProfile'
import Footer from '../../components/user side/footer/Footer'

function UserProfilePage() {
    return (
        <div className='home-padding'>
            <Navbar />
            <UserProfile />
            <Footer />
        </div>
    )
}

export default UserProfilePage
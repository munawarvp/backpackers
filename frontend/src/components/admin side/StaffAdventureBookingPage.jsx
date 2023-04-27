import React from 'react'
import Sidebar from './sidebar/Sidebar'
import AdventureBookingList from './maindash/booking list/AdventureBookingList'

function StaffAdventureBookingPage() {
    return (
        <div className='adventure-panel'>
            <div className="adventure-glass">
                <Sidebar />
                <AdventureBookingList />
            </div>
        </div>
    )
}

export default StaffAdventureBookingPage
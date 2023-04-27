import React from 'react'
import Sidebar from './sidebar/Sidebar'
import ResortBookingList from './maindash/booking list/ResortBookingList'

function BookingPage() {
  return (
    <div className='adventure-panel'>
        <div className="adventure-glass">
            <Sidebar/>
            <ResortBookingList/>
        </div>
    </div>
  )
}

export default BookingPage
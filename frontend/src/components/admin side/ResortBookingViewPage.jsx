import React from 'react'
import Sidebar from './sidebar/Sidebar'
import ResortBookingView from './maindash/booking view/ResortBookingView'

function ResortBookingViewPage() {
    return (
        <div className='booking-view-panel'>
            <div className="booking-view-glass">
                <Sidebar />
                <ResortBookingView/>
            </div>
        </div>
    )
}

export default ResortBookingViewPage
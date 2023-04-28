import React from 'react'
import Sidebar from './sidebar/Sidebar'
import AdventureBookingView from './maindash/booking view/AdventureBookingView'

function AdventureBookingViewPage() {
    return (
        <div className='adventure-panel'>
            <div className="adventure-glass">
                <Sidebar />
                <AdventureBookingView />
            </div>
        </div>
    )
}

export default AdventureBookingViewPage
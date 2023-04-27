import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import BookingAdventures from '../../components/super admin/resort bookings/BookingAdventures'

function AdventureBookingPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <BookingAdventures />
            </div>
    </>
  )
}

export default AdventureBookingPage
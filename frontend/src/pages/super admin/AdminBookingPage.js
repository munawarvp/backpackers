import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import BookingResorts from '../../components/super admin/resort bookings/BookingResorts'

function AdminBookingPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <BookingResorts />
            </div>
        </>
    )
}

export default AdminBookingPage
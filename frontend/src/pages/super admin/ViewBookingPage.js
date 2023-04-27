import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'

function ViewBookingPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
            </div>
        </>
    )
}

export default ViewBookingPage
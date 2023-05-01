import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import ViewDestination from '../../components/super admin/admin single view/ViewDestination'

function ViewDestinationPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <ViewDestination />
            </div>
        </>
    )
}

export default ViewDestinationPage
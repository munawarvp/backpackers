import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AdminViewResort from '../../components/super admin/admin single view/AdminViewResort'

function AdminResortPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <AdminViewResort/>
            </div>
        </>
    )
}

export default AdminResortPage
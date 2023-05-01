import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import ViewAdventure from '../../components/super admin/admin single view/ViewAdventure'

function ViewAdventurePage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <ViewAdventure/>
            </div>
        </>
    )
}

export default ViewAdventurePage
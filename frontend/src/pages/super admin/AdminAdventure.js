import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AllAdventure from '../../components/super admin/admin adventure/AllAdventure'

function AdminAdventure() {
  return (
    <>
        <AdminHeader/>
        <div style={{display:"flex"}}>
            <AdminSidebar/>
            <AllAdventure/>
        </div>
    </>
  )
}

export default AdminAdventure
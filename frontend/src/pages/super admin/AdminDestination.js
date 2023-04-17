import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AllDestination from '../../components/super admin/admin destination/AllDestination'

function AdminDestination() {
  return (
    <>
    <AdminHeader/>
    <div style={{display:"flex"}}>
        <AdminSidebar/>
        <AllDestination/>
    </div>
    </>
  )
}

export default AdminDestination
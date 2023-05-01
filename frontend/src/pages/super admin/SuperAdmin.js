import React from 'react'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminDashboard from '../../components/super admin/dashboard/AdminDashboard'

function SuperAdmin() {
  return (
    <>
      <AdminHeader />
      <div style={{ display: "flex"}}>
          <AdminSidebar />
          <AdminDashboard />
      </div>

    </>
  )
}

export default SuperAdmin
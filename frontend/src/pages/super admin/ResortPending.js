import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import PendingResorts from '../../components/super admin/pending resorts/PendingResorts'

function ResortsPending() {
  return (
    <>
      <AdminHeader/>
      <div style={{display:"flex"}}>
        <AdminSidebar/>
        <PendingResorts/>
      </div>
    </>
  )
}

export default ResortsPending
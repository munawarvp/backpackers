import React from 'react'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AllResorts from '../../components/super admin/all resorts/AllResorts'

function SuperAllResorts() {
  return (
    <>
      <AdminHeader/>
      <div style={{display:"flex"}}>
        <AdminSidebar/>
        <AllResorts/>
      </div>
    </>
  )
}

export default SuperAllResorts
import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import ManageStaffs from '../../components/super admin/manage staff/ManageStaffs'

function ManageStaff() {
  return (
    <>
        <AdminHeader/>
        <div style={{display:"flex"}}>
            <AdminSidebar/>
            <ManageStaffs/>
      </div>
    </>
  )
}

export default ManageStaff
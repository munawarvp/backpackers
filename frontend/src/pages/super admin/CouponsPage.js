import React from 'react'
import AdminHeader from '../../components/super admin/admin header/AdminHeader'
import AdminSidebar from '../../components/super admin/admin sidebar/AdminSidebar'
import AllCoupons from '../../components/super admin/admin coupons/AllCoupons'

function CouponsPage() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: "flex" }}>
                <AdminSidebar />
                <AllCoupons />
            </div>
        </>
    )
}

export default CouponsPage
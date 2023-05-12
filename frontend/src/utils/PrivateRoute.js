import React from "react";
import { getLocal } from "../helpers/auth";
import jwt_decode from "jwt-decode"
import AdminPanel from "../components/admin side/AdminPanel";
import SuperAdmin from "../pages/super admin/SuperAdmin"
import Login from "../components/accounts/Login";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = ({children, ...rest}) => {
    const response = getLocal('authToken');
    const history = useNavigate() 
    if (response){
        const decoded = jwt_decode(response)

        if (decoded.is_admin){
            // console.log('admin');
            return <SuperAdmin/>
        }else if (decoded.is_staff) {
            return <AdminPanel/>
        }
        else{
            return <Login/>
        }

    }else{
        return history('/')
    }

}

export default PrivateRoute;

export const StaffPrivateRoute = ({children, ...rest}) => {
    const response = getLocal('authToken');

    if (response) {
        const decoded = jwt_decode(response)
        if (decoded.is_staff) {
            console.log('staff');
            return <Outlet/>
        }
    }else {
        return <Login/>
    }
}

export const AdminPrivateRoute = ({children, ...rest}) => {
    const response = getLocal('authToken');

    if (response) {
        const decoded = jwt_decode(response)
        if (decoded.is_admin) {
            return <Outlet/>
        }
    }else {
        return <Login/>
    }
}
import React from "react";
import { getLocal } from "../helpers/auth";
import jwt_decode from "jwt-decode"
import AdminPanel from "../components/admin side/AdminPanel";
import SuperAdmin from "../pages/super admin/SuperAdmin"
import Login from "../components/accounts/Login";
import { useNavigate } from "react-router-dom";

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
        // history('/login')
        // console.log('navigated');
        // window.location.href = '/login'
    }

}

export default PrivateRoute;
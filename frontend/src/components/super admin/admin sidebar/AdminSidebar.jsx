import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'
import { BiNote } from 'react-icons/bi'
import { SlLogout } from 'react-icons/sl'
import { IoIosSettings } from 'react-icons/io'
import './adminsidebar.css'

function AdminSidebar() {
    const history = useNavigate()
    const logout = () => {
        localStorage.removeItem('authToken')
        history('/login')
      }
  return (
    <div className='main-sidebar'>
        <div className='top-items'>
            <Link to='/admin-dashboard'><p  className='sidebar-items-top'><AiOutlineHome size={25} className='icons'/> Dashboard</p></Link>
            <Link to='/admin/resorts' ><p className='sidebar-items-top'><AiOutlineHome size={25} className='icons'/> All Resorts</p></Link>
            <Link to='/admin/pendings'><p className='sidebar-items-top'><BiNote size={25} className='icons'/> Pending Requests</p></Link>
            <Link to='/admin/manage-staff'><p className='sidebar-items-top'><BsPersonFillAdd size={25} className='icons'/>Manage Staffs</p></Link>
            <Link to='/admin/destinations' ><p className='sidebar-items-top'><BiNote size={25} className='icons'/> Destinations</p></Link>
            <Link to='/admin/services' ><p className='sidebar-items-top'><BiNote size={25} className='icons'/> Services</p></Link>
            <Link to='/admin/settings' ><p className='sidebar-items-top'><IoIosSettings size={25} className='icons'/> Settings</p></Link>
        </div>
        <div className='top-items'>
            <p className='sidebar-items' onClick={logout}><SlLogout className='icons'/> Logout</p>
        </div>
    </div>
  )
}

export default AdminSidebar
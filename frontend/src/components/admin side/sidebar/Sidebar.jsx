import React from 'react'
import './sidebar.css'
import Logo from '../images/logo.png'
import { SidebarData } from '../data/Data'

import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {
    const [selected, setSelected] = useState(0)
    const [expanded, setExpanded] = useState(true)

    const history = useNavigate()

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        history('/login')
    }

  return (
    <>
    <div className='bars' style={expanded ? {left:'60%'} : {left:'5%'}}
    onClick={()=>setExpanded(!expanded)}
    >
        <UilBars/>
    </div>
    <div className='Sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth<=768?`${expanded}` : ''}
    >
        {/* logo */}
        <div className="logo">
            <img src={Logo} alt="" />
            <span>Back<span>packer</span></span>
        </div>

        {/* sidebar links */}
        <div className="menu">
            {SidebarData.map((item, index)=>{
                return (
                   <Link className='link-modi' to={item.link}><div className={selected===index? 'menuItem active' : 'menuItem'}
                    key={index}
                    onClick={()=>setSelected(index)}
                    >
                        <item.icon/>
                        <span>{item.heading}</span>
                    </div></Link> 
                )
            })}
            <div className="menuItem" onClick={logout}>
                <UilSignOutAlt/>
                <span>Logout</span>
            </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar
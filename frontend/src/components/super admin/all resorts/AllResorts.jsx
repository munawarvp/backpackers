import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {MdDeleteForever} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { Switch } from 'antd'
import './allresorts.css'

function AllResorts() {
    const [allResorts, setAllResorts] = useState([])
    useEffect(()=>{
        resorts();
    },[])

    async function resorts() {
        const response = await axios.get(`${BASE_URL}/resorts/listresorts/`)
        setAllResorts(response.data)
    }

    const handleChange = (id) => {
        axios.get(`${BASE_URL}/resorts/blockresort/${id}`).then(()=>resorts())
    }
    
  return (
    <div className='table-div'>
            <div className="resort-table-header">
                <h1 style={{color:"rgba(255, 255, 255, 0.54)"}}>Resorts List</h1>
                <input className='search-resort-input' type="text" placeholder='Search Resort' />
            </div>
            <div className="align-table">
                <table id="customers">
                    <tr>
                        <th>Resort Name</th>
                        <th>Place</th>
                        <th>Phone</th>
                        <th>Availability</th>
                        <th>Status</th>
                        <th className='action-col'>Actions</th>
                    </tr>
                    {allResorts.map((resort)=>(
                        <tr>
                            <td>{resort.resort_name}</td>
                            <td>{resort.place}</td>
                            <td>{resort.phone_number}</td>
                            <td className='room_avail_col'>{resort.rooms_available}</td>
                            {resort.is_approved ? <td className='approved'>Approved</td> : <td className='pending'>Pending</td>}
                            <td className='action-col' style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Link className='action-text' ><p className='edit'><AiFillEye/> View</p></Link>
                                <Switch style={{ backgroundColor: resort.is_approved ? 'green' : 'red' }} onChange={()=>handleChange(resort.id)}/></td>
                        </tr>
                    ))}
                    
                </table>
            </div>
            
        </div>
  )
}

export default AllResorts
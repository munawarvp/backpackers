import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import {FaEdit} from 'react-icons/fa'
import { Switch } from 'antd'
import './managestaffs.css'

function ManageStaffs() {
    const [staffList, setStaffList] = useState([])
    const [checked, setCheck] = useState(false)

    useEffect(()=>{
        staffs();
    }, [])

    async function staffs(){
        const response = await axios.get(`${BASE_URL}/api/liststaffs`)
        setStaffList(response.data)
    }

    const handleChange = (id) => {
        // console.log('user id', id)
        setCheck(!checked)
        axios.get(`${BASE_URL}/api/blockstaff/${id}`).then(()=>staffs())
        // console.log(response);
    }

  return (
    <div className='table-div'>
        <div className="resort-table-header">
            <h1>Staffs List</h1>
            <input className='search-resort-input' type="text" placeholder='Search Staff' />
        </div>
        <div className="align-table">
                <table id="customers">
                    <tr>
                        <th>Staff Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th className='action-col'>Actions</th>
                    </tr>
                    {staffList.map((item)=>(
                        <tr>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_number}</td>
                            {item.is_active ? <td className='approved'>Staff</td> : <td className='pending'>Blocked</td>}
                            <td className='action-col' style={{display:"flex"}}><p className='edit'><Switch style={{ backgroundColor: item.is_active ? 'green' : 'red' }} onChange={() => handleChange(item.id)}/></p></td>
                        </tr>
                    ))}
                    
                </table>
            </div>
    </div>
  )
}

export default ManageStaffs
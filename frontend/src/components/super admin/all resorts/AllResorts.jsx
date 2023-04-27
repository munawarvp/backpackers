import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { Switch } from 'antd'
import Select from 'react-select';
import './allresorts.css'

function AllResorts() {
    const [allResorts, setAllResorts] = useState([])
    useEffect(() => {
        resorts();
    }, [])

    async function resorts() {
        const response = await axios.get(`${BASE_URL}/resorts/listresorts/`)
        setAllResorts(response.data)
    }

    const handleChange = (id) => {
        axios.get(`${BASE_URL}/resorts/blockresort/${id}`).then(() => resorts())
    }
    async function handleSearch(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/adminsearchresort/?search=${keyword}`)
        setAllResorts(response.data)
    }


    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Approved' },
        { value: 2, label: 'Pending' }
      ]

    const handleFilter = async (option)=> {
        const response = await axios.get(`${BASE_URL}/resorts/adminfilterresort/${option.value}`)
        setAllResorts(response.data)
    }
    return (
        <div className='table-div'>
            <div className="resort-table-header">
                <div style={{display:'flex', alignItems:"center", gap:"1.5rem"}}>
                    <h1 style={{ color: "black" }}>Resorts List</h1>
                    <Select className='resort-filter-drop' options={options} onChange={handleFilter}/>
                </div>
                <input className='allresort-search' type="text" placeholder='Search Resort'
                    onChange={e => handleSearch(e.target.value)}
                />
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
                    {allResorts.map((resort) => (
                        <tr>
                            <td className='all-resort-table-td'>{resort.resort_name}</td>
                            <td>{resort.owner.username}</td>
                            <td>{resort.phone_number}</td>
                            <td className='room_avail_col'>{resort.rooms_available}</td>
                            {resort.is_approved ? <td className='approved'>Approved</td> : <td className='pending'>Pending</td>}
                            <td className='action-col' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Link className='action-text' ><p className='edit'><AiFillEye /> View</p></Link>
                                <Switch style={{ backgroundColor: resort.is_approved ? 'green' : 'red' }} onChange={() => handleChange(resort.id)} /></td>
                        </tr>
                    ))}

                </table>
            </div>

        </div>
    )
}

export default AllResorts
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'
import Select from 'react-select';
import { BASE_URL } from '../../../utils/config'
import { Switch } from 'antd'

function AllAdventure() {
    const [adventureList, setAdventureList] = useState([])
    const [checked, setCheck] = useState(false)

    useEffect(() => {
        adventures();
    }, [])

    async function adventures() {
        const response = await axios.get(`${BASE_URL}/resorts/stafflistadventure/`)
        setAdventureList(response.data)
    }

    const handleChange = (id) => {
        // console.log('user id', id)
        setCheck(!checked)
        axios.get(`${BASE_URL}/resorts/blockadventure/${id}`).then(() => adventures())
        // console.log(response);
    }
    async function handleSearch(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/adminsearchadventure/?search=${keyword}`)
        setAdventureList(response.data)
    }

    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Approved' },
        { value: 2, label: 'Pending' }
      ]

    const handleFilter = async (option)=> {
        const response = await axios.get(`${BASE_URL}/resorts/adminfilteractivity/${option.value}`)
        setAdventureList(response.data)
    }
    return (
        <div className='table-div'>
            <div className="resort-table-header">
                <div style={{ display: 'flex', alignItems: "center", gap: "1.5rem" }}>
                    <h1 style={{ color: "black" }}>Adventure List</h1>
                    <Select className='resort-filter-drop' options={options} onChange={handleFilter} />
                </div>
                <input className='allresort-search' type="text" placeholder='Search Staff'
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
            <div className="align-table">
                <table id="customers">
                    <tr>
                        <th>Activity Name</th>
                        <th>Owner</th>
                        <th>Place</th>
                        <th>Status</th>
                        <th className='action-col'>Actions</th>
                    </tr>
                    {adventureList.map((item) => (
                        <tr>
                            <td>{item.activity_name}</td>
                            <td>{item.owner && item.owner.username}</td>
                            <td>{item.place}</td>
                            {item.is_approved ? <td className='approved'>Approved</td> : <td className='pending'>Blocked</td>}
                            <td className='action-col' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Link className='action-text' to={`/admin/view-adventure/${item.id}`} ><p className='edit'><AiFillEye /> View</p></Link>
                                <p className='edit'><Switch style={{ backgroundColor: item.is_approved ? 'green' : 'red' }} onChange={() => handleChange(item.id)} /></p>
                            </td>
                        </tr>
                    ))}

                </table>
            </div>
        </div>
    )
}

export default AllAdventure
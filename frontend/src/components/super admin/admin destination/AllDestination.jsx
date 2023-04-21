import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'

import { BASE_URL } from '../../../utils/config'
import { Switch } from 'antd'

function AllDestination() {
    const [destinationList, setDestinationList] = useState([])
    const [checked, setCheck] = useState(false)

    useEffect(()=>{
        destinations();
    }, [])

    async function destinations(){
        const response = await axios.get(`${BASE_URL}/resorts/stafflistdestination/`)
        setDestinationList(response.data)
    }

    const handleChange = (id) => {
        // console.log('user id', id)
        setCheck(!checked)
        axios.get(`${BASE_URL}/resorts/blockdestination/${id}`).then(()=>destinations())
        // console.log(response);
    }
    async function handleSearch(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/adminsearchdestination/?search=${keyword}`)
        setDestinationList(response.data)
    }
  return (
    <div className='table-div'>
        <div className="resort-table-header">
            <h1>All Destinations</h1>
            <input className='allresort-search' type="text" placeholder='Search Staff'
                onChange={e=>handleSearch(e.target.value)}
            />
        </div>
        <div className="align-table">
                <table id="customers">
                    <tr>
                        <th>Destination</th>
                        <th>Owner</th>
                        <th>Place</th>
                        <th>Closing Time</th>
                        <th>Status</th>
                        <th className='action-col'>Actions</th>
                    </tr>
                    {destinationList.map((item)=>(
                        <tr>
                            <td>{item.spot_name}</td>
                            <td>{item.owner}</td>
                            <td>{item.place}</td>
                            <td>{item.close_time}</td>
                            {item.is_approved ? <td className='approved'>Approved</td> : <td className='pending'>Blocked</td>}
                            <td className='action-col' style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Link className='action-text' ><p className='edit'><AiFillEye/> View</p></Link>
                                <p className='edit'><Switch style={{ backgroundColor: item.is_approved ? 'green' : 'red' }} onChange={() => handleChange(item.id)}/></p>
                            </td>
                        </tr>
                    ))}
                    
                </table>
            </div>
    </div>
  )
}

export default AllDestination
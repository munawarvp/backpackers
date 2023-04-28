import React, { useEffect, useState } from 'react'
import '../maindash.css'
import './resortlist.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../tableone/tableone.css'
import { Link } from 'react-router-dom';

import Select from 'react-select';

import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/config';
import { Toaster } from 'react-hot-toast';

function createData(
    id,
    resort_name,
    address,
    place,
    phone_number,
    is_approved,
) {
    return { id, resort_name, address, place, phone_number, is_approved };
}


function ResortList() {

    const [resortList, setResortList] = useState([])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    useEffect(() => {
        async function resorts() {
            const response = await axios.get(`${BASE_URL}/resorts/resortslist/?user_id=${user_id}`)
            setResortList(response.data)
        }
        resorts()
    }, [])

    console.log(resortList);

    const rows = [
        ...resortList.map((item) => (
            createData(item.id, item.resort_name, item.address, item.place, item.phone_number, item.is_approved,)

        ))


    ];

    async function searchResorts(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/searchresorts/${user_id}?search=${keyword}`)
        // setResortList(resortList.filter(item => item.resort_name.includes(keyword)))
        setResortList(response.data)
    }

    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Approved' },
        { value: 2, label: 'Pending' },
        { value: 3, label: 'Rejected' },
      ]

    const handleFilter = async (option)=> {
        const response = await axios.get(`${BASE_URL}/resorts/filterresorts/${user_id}/${option.value}`)
        setResortList(response.data)
    }

    return (
        <div className="MainDash">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h1>Resorts</h1>

            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search Resort'
                        onChange={e => searchResorts(e.target.value)}
                    />
                    <Select className='drop-locations' options={options} onChange={handleFilter}/>
                </div>

                <Link className='link-modi' to={'/add-resort'}><h3 className='add-resort-btn'>Add new Resort</h3></Link>
            </div>
            <div className="resort-table">
                <TableContainer component={Paper}
                    style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Resort Name</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Place</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Room Types</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.resort_name}</TableCell>
                                    <TableCell style={{ padding: "10px" }} align="left">{row.address}</TableCell>
                                    <TableCell align="left">{row.place}</TableCell>
                                    <TableCell align="left">{row.phone_number}</TableCell>
                                    <TableCell align="left">{row.is_approved ? <p style={{ color: "green" }}>Approved</p> : <p style={{ color: "red" }}>Pending</p>}</TableCell>
                                    <div style={{ display: "flex" }}>
                                        <Link to={`/staff/view-resort/${row.id}`}><TableCell align="left" className='Details' >View</TableCell></Link>
                                        <Link to={`/staff/update-resort/${row.id}`}><TableCell align="left" className='Details' >Update</TableCell></Link>
                                    </div>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ResortList
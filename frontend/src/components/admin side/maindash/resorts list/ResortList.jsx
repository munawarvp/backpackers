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

import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/config';

function createData(
    customer,
    phone,
    roomtype,
    payment,
    checkin,
) {
    return { customer, phone, roomtype, payment, checkin };
}


function ResortList() {

    const [resortList, setResortList] = useState([])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    useEffect(()=>{
        async function resorts() {
            const response = await axios.get(`${BASE_URL}/resorts/resortslist/?user_id=${user_id}`)
            setResortList(response.data)
        }
        resorts()
    }, [])
    
    console.log(resortList);

    const rows = [
        ...resortList.map((item) => (
            createData(item.resort_name, item.address, item.place, item.phone_number, item.room_type,)
            
        ))
    
        
    ];

    async function searchResorts(keyword) {
        // const response = await axios.get(`${BASE_URL}/resorts/searchresorts/?search=${keyword}`)
        setResortList(resortList.filter(item => item.resort_name.includes(keyword)))
    }

  return (
    <div className="MainDash">
        <h1>Resorts</h1>
        
        <div className="header">
            <input className='search-resort' type="text" placeholder='Search Resort'
             onChange={e => searchResorts(e.target.value)}
            />
            <Link className='link-modi' to={'/add-resort'}><h3 className='add-resort-btn'>Add new Resort</h3></Link> 
        </div>
        <div className="resort-table">
        <TableContainer component={Paper}
                style={{boxShadow: '0px 13px 20px 0px #80808029'}}
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
                                <TableCell align="left">{row.customer}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.roomtype}</TableCell>
                                <TableCell align="left">{row.payment}</TableCell>
                                <TableCell align="left">{row.checkin}</TableCell>
                                <TableCell align="left" className='Details' >Update</TableCell>
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
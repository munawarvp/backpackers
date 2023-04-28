import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Select from 'react-select';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import { BASE_URL } from '../../../../utils/config';

import '../destination list/destinationlist.css'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function createData(
    booking_id,
    booked_activity,
    first_name,
    activity_date,
    status,
    id
) {
    return { booking_id, booked_activity, first_name, activity_date, status, id };
}

function AdventureBookingList() {
    const [destinationList, setDestinationList] = useState([])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    useEffect(() => {
        getAdventureBookings();
    }, [])
    
    async function getAdventureBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/stafflistadventurebookings/${user_id}`)
        setDestinationList(response.data)
    }

    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'New' },
        { value: 2, label: 'Check In' },
        { value: 2, label: 'Check Out' },
        { value: 2, label: 'Cancelled' },
    ]

    const rows = [
        ...destinationList.map((item) => (
            createData(item.booking_id, item.booked_activity, item.first_name, item.activity_date, item.status, item.id)

        ))
    ];

    const handleFilter = async (option) => {
        const response = await axios.get(`${BASE_URL}/resorts/filterdestination/${user_id}/${option.value}`)
        setDestinationList(response.data)
    }

  return (
    <div className="Maindash">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h1>Adventure Bookings</h1>
            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search adventure bookings'
                        // onChange={e => searchDestination(e.target.value)}
                    />
                    <Select className='drop-locations' options={options} onChange={handleFilter} />
                </div>
                <Link to={'/staff/bookings'}><h3 className='add-resort-btn'>Resort Bookings</h3></Link> 
            </div>
            

            <TableContainer component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Booking Id</TableCell>
                            <TableCell align="left">Booked Activity</TableCell>
                            <TableCell align="left">Customer</TableCell>
                            <TableCell align="left">Booking Date</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell align="left">{row.booking_id}</TableCell>
                                <TableCell align="left">{row.booked_activity && row.booked_activity.activity_name}</TableCell>
                                <TableCell align="left">{row.first_name}</TableCell>
                                <TableCell align="left">{row.activity_date}</TableCell>
                                <TableCell align="left"><p style={{ color: "green" }}>{row.status}</p></TableCell>
                                <TableCell align="left" className='Details'><div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Link to={`/staff/adventure-booking-view/${row.booking_id}`}><p>View</p></Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  )
}

export default AdventureBookingList
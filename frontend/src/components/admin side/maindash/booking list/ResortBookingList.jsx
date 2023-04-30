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
    booked_resort,
    first_name,
    check_in,
    status,
    id
) {
    return { booking_id, booked_resort, first_name, check_in, status, id };
}

function ResortBookingList() {
    const [destinationList, setDestinationList] = useState([])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    useEffect(() => {
        getBookings();
    }, [])

    async function getBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/stafflistresortbookings/${user_id}`)
        setDestinationList(response.data)
    }

    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'New' },
        { value: 2, label: 'Check In' },
        { value: 3, label: 'Check Out' },
        { value: 4, label: 'Cancelled' }
    ]

    const rows = [
        ...destinationList.map((item) => (
            createData(item.booking_id, item.booked_resort, item.first_name, item.check_in, item.status, item.id)

        ))
    ];

    async function searchBooking(keyword) {
        const response = await axios.get(`${BASE_URL}/bookings/searchresortbooking/${user_id}?search=${keyword}`)
        setDestinationList(response.data)
    }

    const handleFilter = async (option) => {
        const response = await axios.get(`${BASE_URL}/bookings/filterresortbooking/${user_id}/${option.value}`)
        setDestinationList(response.data)
    }
  return (
    <div className="Maindash">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h1>Resort Bookings</h1>
            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search bookings'
                        onChange={e => searchBooking(e.target.value)}
                    />
                    <Select className='drop-locations' options={options} onChange={handleFilter} />
                </div>
                <Link to={'/staff/adventure-bookings'}><h3 className='add-resort-btn'>Adventure Bookings</h3></Link> 
            </div>
            

            <TableContainer component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Booking Id</TableCell>
                            <TableCell align="left">Booked Resort</TableCell>
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
                                <TableCell align="left">{row.booked_resort && row.booked_resort.resort_name}</TableCell>
                                <TableCell align="left">{row.first_name}</TableCell>
                                <TableCell align="left">{row.check_in}</TableCell>
                                <TableCell align="left"><p style={{ color: "green" }}>{row.status}</p></TableCell>
                                <TableCell align="left" className='Details'><div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Link to={`/staff/resort-booking-view/${row.booking_id}`}><p >View</p></Link> 
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

export default ResortBookingList
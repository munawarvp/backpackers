import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './tableone.css'

function createData(
    customer,
    phone,
    roomtype,
    payment,
    checkin,
) {
    return { customer, phone, roomtype, payment, checkin };
}

const rows = [
    createData('Munawar', '7558916838', '2BHK', 'Paid', '16-03-2023'),
    createData('Ajith Mt', '7558916838', '2BHK', 'Paid', '16-03-2023'),
    createData('Swali', '7558916838', '2BHK', 'Paid', '16-03-2023'),
    
];

export default function BasicTable() {
    return (
        <div className="Table">
            <h3>Recent Bookings</h3>
            <TableContainer component={Paper}
                style={{boxShadow: '0px 13px 20px 0px #80808029'}}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Room</TableCell>
                            <TableCell align="left">Payment</TableCell>
                            <TableCell align="left">CheckIn</TableCell>
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
                                <TableCell align="left" className='Details' >View</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
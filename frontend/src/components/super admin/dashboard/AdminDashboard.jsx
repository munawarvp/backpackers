import React, { useState } from 'react'
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import ReactApexChart from 'react-apexcharts';
import './admindashboard.css'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

function AdminDashboard() {
    const [bookingList, setBookingList] = useState([])
    const [adventureBookings, setAdventureBookings] = useState([])
    const [count, setCount] = useState({})

    useEffect(()=>{
        getCounts();
        getResortBookings();
        getActivityBookings();
    }, [])

    async function getCounts() {
        const response = await axios.get(`${BASE_URL}/resorts/admindasboardcount`)
        setCount(response.data)
    }
    async function getResortBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/recentresortbookings`)
        setBookingList(response.data)
    }
    async function getActivityBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/recentactivitybookings`)
        setAdventureBookings(response.data)
    }



    const [chartData, setChartData] = useState({
        series: [{
            data: [21, 22, 10, 28, 16, 21, 13]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            //   colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    ['Sunday'],
                    ['Monday'],
                    ['Tuesday'],
                    ['Wednesday'],
                    ['Thursday'],
                    ['Friday'],
                    ['Satarday'],

                ],
                labels: {
                    style: {
                        // colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        }
    });

    const [pieChartData, setPieChartData] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    });
    return (
        <div className="admin-dashboard-main-container">
            <div className='admin-dashboard-heading'>
                <h1>Dashboard</h1>
            </div>

            <div className="dashboard-menu-container">
                <div className="dashboard-single-menu menu-red">
                    <h2>Total Resorts</h2>
                    <div className='count-icon'>
                        <h1>{count.resort_count}</h1>
                        <HomeWorkIcon style={{ fontSize: '3rem' }} />
                    </div>
                </div>
                <div className="dashboard-single-menu menu-blue">
                    <h2>Total Bookings</h2>
                    <div className='count-icon'>
                        <h1>{count.total_booking}</h1>
                        <AssignmentTurnedInIcon style={{ fontSize: '3rem' }} />
                    </div>

                </div>
                <div className="dashboard-single-menu menu-yellow">
                    <h2>Total Revenue</h2>
                    <div className='count-icon'>
                        <h1>20</h1>
                        <CurrencyRupeeRoundedIcon style={{ fontSize: '3rem' }} />
                    </div>

                </div>
            </div>

            <div className="dashboard-graph-container">
                <div className="first-graph">
                    <h3>Weekly Bookings</h3>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={290} />
                </div>
                <div className="first-graph">
                    <h3>Total Applies</h3>
                    <ReactApexChart options={chartData.options} series={pieChartData.series} type="donut" height={290} />
                </div>
            </div>

            <div className="dashboard-recent-bookings">
                <div className='table-div'>
                    <div className="resort-table-header">
                        <h3>Recent Resort Bookings</h3>
                    </div>
                    <div className="align-table">
                        <table id="customers">
                            <tr>
                                <th>Booking Id</th>
                                <th>Customer</th>
                                <th>Resort booked</th>
                                <th>Booked date</th>
                                <th>Status</th>
                                <th className='action-col'>Actions</th>
                            </tr>
                            {bookingList.map((item) => (
                                <tr>
                                    <td>{item.booking_id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.booked_resort.resort_name}</td>
                                    <td>{item.booking_date.slice(0, 16)}</td>
                                    <td style={{ color: "green", fontWeight: "bold" }}>{item.status}</td>
                                    <td className='action-col' style={{ display: "flex" }}><Link to={'/admin/view-booking'} className='action-text' ><p className='edit'><AiFillEye /> View</p></Link></td>
                                </tr>
                            ))}

                        </table>
                    </div>
                </div>
            </div>

            <div className="dashboard-recent-bookings">
                <div className='table-div'>
                    <div className="resort-table-header">
                        <h3>Recent Adventure Bookings</h3>
                    </div>
                    <div className="align-table">
                        <table id="customers">
                            <tr>
                                <th>Booking Id</th>
                                <th>Customer</th>
                                <th>Activity booked</th>
                                <th>Booked date</th>
                                <th>Status</th>
                                <th className='action-col'>Actions</th>
                            </tr>
                            {adventureBookings.map((item) => (
                                <tr>
                                    <td>{item.booking_id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.booked_activity.activity_name}</td>
                                    <td>{item.booking_date.slice(0, 16)}</td>
                                    <td style={{ color: "green", fontWeight: "bold" }}>{item.status}</td>
                                    <td className='action-col' style={{ display: "flex" }}><Link to={'/admin/view-booking'} className='action-text' ><p className='edit'><AiFillEye /> View</p></Link></td>
                                </tr>
                            ))}

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
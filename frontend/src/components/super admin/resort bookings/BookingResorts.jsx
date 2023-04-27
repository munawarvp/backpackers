import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { Link } from 'react-router-dom'
import './bookingadventures.css'


function BookingResorts() {
  const [bookingList, setBookingList] = useState([])

  useEffect(() => {
    bookings();
  }, [])

  async function bookings() {
    const response = await axios.get(`${BASE_URL}/bookings/admingetallbookings`)
    setBookingList(response.data)
  }
  return (
    <div className='table-div'>
      <div className="resort-table-header">
        <h1>Resort Bookings</h1>
        <Link to={'/admin/adventure-bookings'}><button className="view-adventure-bookings">Adventure Bookings</button></Link>
        <input className='allresort-search' type="text" placeholder='Search booking'/>
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
  )
}

export default BookingResorts
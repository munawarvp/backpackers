import React from 'react'
import profile from '../../../../images/img1.png'

import { Link, useParams } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa'
import { FcLeave } from 'react-icons/fc'
import { MdEmail, MdSupervisorAccount } from 'react-icons/md'
import { BsFillTelephoneFill, BsClipboardCheckFill } from 'react-icons/bs'
import './resortbookingview.css'
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/config';
import { useEffect } from 'react';
import Select from 'react-select';

function AdventureBookingView() {
  const [singleBooking, setSingleBooking] = useState({})

  const booking_id = useParams()

  useEffect(() => {
    getBooking();
  }, [])

  async function getBooking() {
    const response = await axios.get(`${BASE_URL}/bookings/adventurebookingsummary/${booking_id.id}`)
    setSingleBooking(response.data)
  }

  const options = [
    { value: 1, label: 'New' },
    { value: 2, label: 'Checked In' },
    { value: 3, label: 'Checked Out' },
    { value: 4, label: 'Cancelled' },
  ]


  return (
    <div className="Maindash">
            <h1>Current Booking</h1>
            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search bookings'
                    // onChange={e => searchDestination(e.target.value)}
                    />
                </div>
                <Link><h3 className='add-resort-btn'>Adventure Bookings</h3></Link>
            </div>
            <div className="booking-view-main-container">
                <div className="booking-view-details-container">
                    <h3>Booking Details</h3>
                    <div className="booking-view-img-container">
                        <div className="single-booked-img">
                            <img className='booked-img' src={`${BASE_URL}/${singleBooking.booked_activity && singleBooking.booked_activity.activity_one}`} alt="" />
                        </div>
                        <div className="single-booked-img">
                            <img className='booked-img' src={`${BASE_URL}/${singleBooking.booked_activity && singleBooking.booked_activity.activity_two}`} alt="" />
                        </div>
                        <div className="single-booked-img">
                            <img className='booked-img' src={`${BASE_URL}/${singleBooking.booked_activity && singleBooking.booked_activity.activity_three}`} alt="" />
                        </div>
                    </div>
                    <div className="booking-view-resort-details">
                        <h2 className='view-resort-heading'>{singleBooking.booked_activity && singleBooking.booked_activity.activity_name}</h2>
                        <h3>{singleBooking.booked_activity && singleBooking.booked_activity.place}</h3>
                    </div>

                    <div className="booking-view-checkin-details">
                        <div className="checkin-details-equal">
                            <MdSupervisorAccount size={30} />
                            <div className='checkin-details-inside'>
                                <p>Booking Id :</p>
                                <h3>{singleBooking.booking_id}</h3>
                            </div>

                        </div>
                        <div className="checkin-details-equal">
                            <BsClipboardCheckFill size={20} />
                            <div className='checkin-details-inside'>
                                <p>Time Taken : </p>
                                <h3>{singleBooking.booked_activity && singleBooking.booked_activity.time_take } minutes</h3>
                            </div>
                        </div>
                        <div className="checkin-details-equal">
                            <FcLeave size={30} />
                            <div className='checkin-details-inside'>
                                <p>Activity Date : </p>
                                <h3>{singleBooking.activity_date}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="booking-view-payment-details">
                        <div>
                            <h3 className='view-resort-heading'>Total amount to pay : {singleBooking.booking_total} ₹</h3>
                            <h3>Payment method : {singleBooking.payment_method}</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection:"column" }}>
                            <div style={{display:"flex"}}>
                                <h3>Status of booking : </h3>
                                <h3 style={{ color: "green" }}>{singleBooking.status}</h3>
                            </div>
                            <div>
                                <Select className='drop-locations' options={options} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="booking-view-user-container">
                    <div className="booked-user-info-card">
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <img height="130px" src={profile} alt="" />
                        </div>
                        <div className='booked-user-info'>
                            <h4><FaUserAlt size={25} /> {singleBooking.first_name}</h4>
                            <h4><BsFillTelephoneFill size={25} /> {singleBooking.phone_number}</h4>
                            <h4><MdEmail size={25} /> {singleBooking.email}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AdventureBookingView
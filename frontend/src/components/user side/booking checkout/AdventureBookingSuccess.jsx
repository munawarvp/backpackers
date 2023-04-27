import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { useEffect } from 'react'

function AdventureBookingSuccess() {
  const history = useNavigate()
  const booking_id = useParams()
  const [bookingDetail, setBookingDetail] = useState({})

  useEffect(() => {
    booking();
  }, [])

  async function booking() {
    const response = await axios.get(`${BASE_URL}/bookings/adventurebookingsummary/${booking_id.id}`)
    setBookingDetail(response.data)
  }

  return (
    <div className='booking-succ-bg'>
            <div className="booking-success-main-container">
                <div className='booking-heading-div'>
                    <h2 className='booking-summary-heading'>Your Booking completed successfully..!</h2>

                </div>
                <div className="booking-summary-container">
                    <p className='summary-resort-headings'>Order Summery :</p>
                    <div className="summary-img-container">
                        <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_activity && bookingDetail.booked_activity.activity_one}`} alt="" />
                        <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_activity && bookingDetail.booked_activity.activity_two}`} alt="" />
                        <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_activity && bookingDetail.booked_activity.activity_three}`} alt="" />
                    </div>
                    <p className='summary-resort-name'>{bookingDetail.booked_activity && bookingDetail.booked_activity.activity_name}</p>
                    <p>{bookingDetail.booked_activity && bookingDetail.booked_activity.place}</p>
                    <p>Guest Name : {bookingDetail.booked_activity && bookingDetail.user.username}</p>
                    <p>Booked Date : {bookingDetail.booked_activity && bookingDetail.booking_date}</p>
                    <p>Payment Method : {bookingDetail.booked_activity && bookingDetail.payment_method}</p>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <div className="summary-checkin">
                            <p> <b>Activity Date :</b> {bookingDetail.activity_date}</p>
                        </div>
                        <div className="summary-checkin">
                            <p> <b>Phone Number :</b> {bookingDetail.phone_number}</p>
                        </div>
                        
                    </div>
                    <div className="booking-payment-info">
                        <h3 className='summary-resort-name'>Total Payable Amount : {bookingDetail.booked_activity && bookingDetail.booking_total}</h3>
                        <h3 className='summary-resort-payment'>Payment Status : {bookingDetail.payment_method}</h3>
                    </div>


                </div>
                <div className='regi-btn-div'>
                    <button className='booking-summary-btn' onClick={() => history('/')}>Home Page</button>
                </div>

            </div>
        </div>
  )
}

export default AdventureBookingSuccess
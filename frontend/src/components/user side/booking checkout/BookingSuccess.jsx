import React from 'react'
import Done from '../../../images/Checklist.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { useEffect } from 'react'

function BookingSuccess() {
    const history = useNavigate()
    const booking_id = useParams()
    const [bookingDetail, setBookingDetail] = useState({})
    console.log(booking_id);
    useEffect(() => {
        booking();
    }, [])

    async function booking() {
        const response = await axios.get(`${BASE_URL}/bookings/getbookingsummary/${booking_id.id}`)
        setBookingDetail(response.data)
    }

    console.log(bookingDetail);

    return (
        <div className='booking-succ-bg'>
            <div className="booking-success-main-container">
                <div className='booking-heading-div'>
                    <h2 className='booking-summary-heading'>Your Booking completed successfully..!</h2>

                </div>
                <div className="booking-summary-container">
                    <p className='summary-resort-headings'>Order Summery :</p>
                    <div className="summary-img-container">
                        <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_resort && bookingDetail.booked_resort.image_one}`} alt="" />
                        <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_resort && bookingDetail.booked_resort.image_two}`} alt="" />
                    </div>
                    <p className='summary-resort-name'>{bookingDetail.booked_resort && bookingDetail.booked_resort.resort_name}</p>
                    <p>{bookingDetail.booked_resort && bookingDetail.booked_resort.address}</p>
                    <p>Guest Name : {bookingDetail.booked_resort && bookingDetail.user.username}</p>
                    <p>Guest Phone Number : {bookingDetail.booked_resort && bookingDetail.user.phone_number}</p>
                    <p>Booked Date : {bookingDetail.booked_resort && bookingDetail.booking_date}</p>
                    <p>Payment Method : {bookingDetail.booked_resort && bookingDetail.payment_method}</p>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <div className="summary-checkin">
                            <p> <b>Check In :</b> {bookingDetail.check_in}</p>
                        </div>
                        <div className="summary-checkin">
                            <p> <b>Check Out :</b> {bookingDetail.check_out}</p>
                        </div>
                        <div className="summary-checkin">
                            <p> <b>Number of guests : </b> {bookingDetail.occupancy}</p>
                        </div>
                    </div>
                    <div className="booking-payment-info">
                        <h3 className='summary-resort-name'>Total Payable Amount : {bookingDetail.booked_resort && bookingDetail.booking_total}</h3>
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

export default BookingSuccess




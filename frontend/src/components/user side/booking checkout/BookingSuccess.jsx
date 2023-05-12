import React, { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { useEffect } from 'react'

import Background4 from '../../../images/Booking Success.gif'
import Background5 from '../../../images/Coupon.gif'
import Background6 from '../../../images/Coupon2.gif'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function BookingSuccess() {
    const history = useNavigate()
    const booking_id = useParams()
    const [bookingDetail, setBookingDetail] = useState({})
    const [paymentDetail, setPaymentDetail] = useState({})

    const location = useLocation()
    const pdfRef = useRef();
    // console.log(location.state.coupon_serializer.coupon.code, 'got the state');
    console.log(location.state.coupon_serializer, 'got the state');
    useEffect(() => {
        booking();
    }, [])

    async function booking() {
        const response = await axios.get(`${BASE_URL}/bookings/getbookingsummary/${booking_id.id}`)
        const response_two = await axios.get(`${BASE_URL}/bookings/getpaymentsummery/${booking_id.id}`)
        setBookingDetail(response.data)
        setPaymentDetail(response_two.data)
    }
    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            console.log(pdf);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf')

        });
    }


    return (
        <div className='booking-succ-bg'>
            <div className="booking-success-main-container">
                <div className='booking-heading-div'>
                    <h2 className='booking-summary-heading'>Your Booking completed successfully..!</h2>
                    {location.state.coupon_serializer && <h3>You have won a coupon..!</h3>}
                    {location.state.coupon_serializer && <p>Coupon Code :</p>}
                    {location.state.coupon_serializer && <p className='booking-reward-coupon-code'>{location.state.coupon_serializer && location.state.coupon_serializer.coupon.code}<ContentCopyIcon/></p>}
                    {location.state.coupon_serializer ? <div className="booking-success-gif-container">
                        {location.state.coupon_serializer && <img className='booking-gif' src={Background5} alt="" />}
                        <img className='booking-gif' src={Background4} alt="" />
                        {location.state.coupon_serializer && <img className='booking-gif' src={Background6} alt="" />}
                    </div> :
                        <div className="booking-success-no-coupon">
                            <img className='booking-gif' src={Background4} alt="" />

                        </div>}

                </div>

                <div className='booking-summary-btn-contain'>
                    <button className='booking-summary-btn' onClick={() => history('/')}>Home Page</button>
                    <button className='download-summary-btn' onClick={downloadPdf}>Download PDF</button>
                </div>

            </div>

            <div className="booking-success-main-container" ref={pdfRef}>
                <div className="booking-summary-container">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className='summary-resort-headings'>Order Summery</h3>
                        <h2 className="summary-resort-headings">{bookingDetail.booking_id}</h2>
                    </div>

                    <p>Hi {bookingDetail.booked_resort && bookingDetail.user.username},<br />
                        Your booking has been confirmed, We'll send you the booking details to your email.<br />
                        Booking summary is give you can reffer and download the details.<br />
                        Thank you.!
                    </p>
                    <p className='summary-resort-name'>{bookingDetail.booked_resort && bookingDetail.booked_resort.resort_name}</p>
                    <div className="summary-img-container">
                        <div className="summary-img-contain">
                            <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_resort && bookingDetail.booked_resort.image_one}`} alt="" />
                        </div>
                        <div className="summary-img-contain">
                            <img className='summary-image' src={`${BASE_URL}/${bookingDetail.booked_resort && bookingDetail.booked_resort.image_two}`} alt="" />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
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

                    <div style={{ marginTop: "1rem" }}>
                        <p>{bookingDetail.booked_resort && bookingDetail.booked_resort.address}</p>
                        <p>Guest Name : {bookingDetail.booked_resort && bookingDetail.user.username}</p>
                        <p>Guest Phone Number : {bookingDetail.booked_resort && bookingDetail.user.phone_number}</p>
                        <p>Booked Date : {bookingDetail.booked_resort && bookingDetail.booking_date.slice(0, 10)}</p>
                        <p>Payment Method : {bookingDetail.booked_resort && bookingDetail.payment_method}</p>
                    </div>


                    <div className="booking-payment-info">
                        <h3 className='summary-resort-name'>Total Payable Amount : {bookingDetail.booked_resort && bookingDetail.booking_total}₹</h3>
                        <div>
                            <h3 className='summary-resort-payment'>Payment Status : {bookingDetail.payment_method}</h3>
                            {paymentDetail.payment_id && <p>Payment Id: {paymentDetail.payment_id}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingSuccess




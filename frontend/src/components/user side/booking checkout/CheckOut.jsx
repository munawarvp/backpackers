import React, { useState, useEffect } from 'react'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import { BookingSchema } from '../../../validations/FormValidation'

// import { useSelector } from 'react-redux'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import './checkout.css'
import { toast, Toaster } from 'react-hot-toast'


function CheckOut() {
  const [singleResort, setSingleResort] = useState({})
  // const { resort_id } = useSelector((state) => state.booking)
  const history = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getResort()
  }, [])


  async function getResort() {
    const id = localStorage.getItem('resort_id')
    const response = await axios.get(`${BASE_URL}/resorts/singleresortpage/${id}`)
    setSingleResort(response.data)
  }

  let user_id
  let resort_id
  const token = getLocal()
  if (token) {
    const decoded = jwtDecode(token)
    user_id = decoded.user_id

  }
  else {

    localStorage.setItem('location', location.pathname)
    history('/login')
  }

  const formik = useFormik({
    initialValues: {
      user: user_id,
      booked_resort: resort_id,
      check_in: null,
      check_out: null,
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      address: '',
      booking_total: singleResort.price,
      payment_method: '',
      occupancy: null
    },
    validationSchema: BookingSchema,
    onSubmit: async values => {
      const form = new FormData()
      form.append('user', values.user)
      form.append('booked_resort', singleResort.id)
      form.append('check_in', values.check_in)
      form.append('check_out', values.check_out)
      form.append('first_name', values.first_name)
      form.append('last_name', values.last_name)
      form.append('phone_number', values.phone_number)
      form.append('email', values.email)
      form.append('address', values.address)
      form.append('booking_total', singleResort.price)
      form.append('payment_method', values.payment_method)
      form.append('occupancy', values.occupancy)

      const response = await axios.post(`${BASE_URL}/bookings/createbookingresort/`, form)
      const booking_id = response.data.booking_id
      if (response.data.msg === 200) {

        history(`/booking-success/${booking_id}`)
      } else if (response.data.msg === 504) {
        toast.error('No availability')
      } else {
        toast.error('Something went wrong')
      }
      console.log(response.data.msg);
    }
  })
  return (
    <div>
      <Toaster position='top-center' reverseOrder='false' ></Toaster>
      <div className="checkout-heading">
        <h1>confirm your booking</h1>
      </div>

      <form className='booking-form' onSubmit={formik.handleSubmit}>
        <div className="form-details-container">
          <div className="checkform-container">
            <div className="booking-checkout-input-container">
              <input className='booking-input-name' type="text" name='first_name' placeholder='First name'
                onChange={formik.handleChange}
              />
              {formik.errors.first_name && formik.touched.first_name ? <p className='form-errors'>{formik.errors.first_name}</p> : null}
            </div>
            <div className="booking-checkout-input-container">
              <input className='booking-input-name' type="text" name='last_name' placeholder='Last name'
                onChange={formik.handleChange}
              />
              {formik.errors.last_name && formik.touched.last_name ? <p className='form-errors'>{formik.errors.last_name}</p> : null}
            </div>

            <div className="booking-checkout-input-container">
              <input className='booking-input-name' type="text" name='phone_number' placeholder='Contact Number'
                onChange={formik.handleChange}
              />
              {formik.errors.phone_number && formik.touched.phone_number ? <p className='form-errors'>{formik.errors.phone_number}</p> : null}
            </div>
            <div className="booking-checkout-input-container">
              <input className='booking-input-name' type="email" name='email' placeholder='Email'
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? <p className='form-errors'>{formik.errors.email}</p> : null}
            </div>

            <div className="booking-checkout-input-container">
              <input className='booking-input-name' type="text" name='address' placeholder='Address'
                onChange={formik.handleChange}
              />
              {formik.errors.address && formik.touched.address ? <p className='form-errors'>{formik.errors.address}</p> : null}
            </div>

            <div className="booking-form-dates">
              <div style={{width:"100%"}}>
                <input className='booking-input-date' type="date" name='check_in' placeholder='Check In'
                  onChange={formik.handleChange}
                />
                {formik.errors.check_in && formik.touched.check_in ? <p className='form-errors'>{formik.errors.check_in}</p> : null}
              </div>
              <div style={{width:"100%"}}>
                <input className='booking-input-date' type="date" name='check_out' placeholder='Check Out'
                  onChange={formik.handleChange}
                />
                {formik.errors.check_out && formik.touched.check_out ? <p className='form-errors'>{formik.errors.check_out}</p> : null}
              </div>


            </div>
          </div>
          <div className="details-container">
            <div className="booking-details-card">
              <div className="booking-img-container">
                <img className='booking-resort-img' src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
              </div>
              <div className="booking-details-name">
                <h3>{singleResort.resort_name}</h3>
                <h4>{singleResort.price} ₹</h4>
              </div>
              <div className="booking-details-small">
                <p>1x Night and 1x Day </p>
              </div>
              <div className="booking-details-input">
                <input className='booking-right-input' type="number" name='occupancy' placeholder='Number of guests'
                  onChange={formik.handleChange}
                />
                {formik.errors.occupancy && formik.touched.occupancy ? <p className='form-errors'>{formik.errors.occupancy}</p> : null}
                <div className="booking-payment-method">
                  <label>
                    <input type="radio" value="Razorpay" name='payment_method'
                      onChange={formik.handleChange}
                    />
                    RazorPay
                  </label>
                  <label>
                    <input type="radio" value="Pay at desk" name='payment_method'
                      onChange={formik.handleChange}
                    />
                    Pay at checkIn
                  </label>
                </div>
              </div>
              <div className="booking-btn-container">
                <button className="booking-btn" type='submit'>Book Now</button>
              </div>

            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckOut
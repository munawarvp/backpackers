import React, { useState, useEffect } from 'react'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import { ActivityBookingSchema } from '../../../validations/FormValidation'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import './checkout.css'
import { toast, Toaster } from 'react-hot-toast'

function AdventureCheckout() {
    const [singleAdventure, setSingleadventure] = useState({})
    const history = useNavigate()
    const location = useLocation()

    useEffect(() => {

        getActivity();
    }, [])

    let user_id
    let activity_id
    const token = getLocal()
    if (token) {
        const decoded = jwtDecode(token)
        user_id = decoded.user_id

    }
    else {

        localStorage.setItem('location', location.pathname)
        history('/login')
    }

    async function getActivity() {
        const id = localStorage.getItem('activity_id')
        const response = await axios.get(`${BASE_URL}/resorts/getadventuredetail/${id}`)
        setSingleadventure(response.data)
    }

    const formik = useFormik({
        initialValues: {
            user: user_id,
            booked_activity: activity_id,
            first_name: '',
            email: '',
            address: '',
            age: null,
            activity_date: null,
            phone_number: '',
            weight: null,
            guardian_name: '',
            guardian_phone: '',
            medical_condition: false,
            booking_total: singleAdventure.price,
            payment_method: '',
        },
        validationSchema: ActivityBookingSchema,
        onSubmit: async values => {
            const form = new FormData()
            form.append('user', values.user)
            form.append('booked_activity', singleAdventure.id)
            form.append('first_name', values.first_name)
            form.append('email', values.email)
            form.append('address', values.address)
            form.append('age', values.age)
            form.append('activity_date', values.activity_date)
            form.append('phone_number', values.phone_number)
            form.append('weight', values.weight)
            form.append('guardian_name', values.guardian_name)
            form.append('guardian_phone', values.guardian_phone)
            form.append('medical_condition', values.medical_condition)
            form.append('booking_total', singleAdventure.price)
            form.append('payment_method', values.payment_method)

            const response = await axios.post(`${BASE_URL}/bookings/createbookingadventure/`, form)
            const booking_id = response.data.booking_id
            if (response.data.msg === 200) {

                toast.success('Activity booked')
                history(`/adventure-booking-success/${booking_id}`)
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
                            <div className="adventure-booking-name-email">
                                <input className='booking-input-half' type="text" name='first_name' placeholder="Participant's name"
                                    onChange={formik.handleChange}
                                />
                                <input className='booking-input-half' type="email" name='email' placeholder='Email'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {formik.errors.first_name && formik.touched.first_name ? <p className='form-errors'>{formik.errors.first_name}</p> : null}
                        </div>

                        <div className="booking-checkout-input-container">
                            <input className='booking-input-name' type="text" name='address' placeholder='Address'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.address && formik.touched.address ? <p className='form-errors'>{formik.errors.address}</p> : null}
                        </div>
                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <input className='booking-input-half' type="number" name='age' placeholder="Age of participant"
                                    onChange={formik.handleChange}
                                />
                                <input className='booking-input-half' type="date" name='activity_date' placeholder='Date you want to book'
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <input className='booking-input-half' type="text" name='phone_number' placeholder="Contact number"
                                    onChange={formik.handleChange}
                                />
                                <input className='booking-input-half' type="number" name='weight' placeholder='Weight of participant'
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <input className='booking-input-half' type="text" name='guardian_name' placeholder="Participant's guardian name"
                                    onChange={formik.handleChange}
                                />
                                <input className='booking-input-half' type="text" name='guardian_phone' placeholder='Phone number of guardian'
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <input type="checkbox" name='medical_condition' 
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="medical_condition">Any medical illness?</label>
                                <input type="checkbox" name='terms_condition' required />
                                <label htmlFor="terms_condition">Accept Terms and conditions</label>
                            </div>
                        </div>


                    </div>
                    <div className="details-container">
                        <div className="booking-details-card">
                            <div className="booking-img-container">
                                <img className='booking-resort-img' src={`${BASE_URL}/${singleAdventure.activity_one}`} alt="" />
                            </div>
                            <div className="booking-details-name">
                                <h3>{singleAdventure.activity_name}</h3>
                                <h4>{singleAdventure.price} ₹</h4>
                            </div>
                            <div className="booking-details-small">
                                <p>{singleAdventure.time_take} Minutes</p>
                            </div>
                            <div className="booking-details-input">
                                
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
                                        Pay at location
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

export default AdventureCheckout
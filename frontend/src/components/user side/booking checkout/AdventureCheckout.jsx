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

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AdventureCheckout() {
    const [singleAdventure, setSingleadventure] = useState({})
    const [booking_total_state, setBookingTotal] = useState(0)
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
        setBookingTotal(response.data.price)
    }

    let formObject = {}

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

            if (values.payment_method === "Pay at desk") {
                const response = await axios.post(`${BASE_URL}/bookings/createbookingadventure/`, form)
                const booking_id = response.data.booking_id
                if (response.data.msg === 200) {

                    toast.success('Activity booked')
                    history(`/adventure-booking-success/${booking_id}`)
                } else {
                    toast.error('Something went wrong')
                }
                console.log(response.data.msg);
            } else if (values.payment_method === 'Razorpay') {

                formObject = Object.fromEntries(form.entries());
                showRazorpay();
            }

        }
    })

    const showRazorpay = async () => {
        const res = loadScript();
        let bodyData = new FormData();

        // we will pass the amount and product name to the backend using form data
        bodyData.append("amount", booking_total_state.toString());
        bodyData.append("form", JSON.stringify(formObject))

        const data = await axios({
            url: `${BASE_URL}/bookings/activitypay/`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: bodyData,
        }).then((res) => {
            console.log(res,'this is res');
            if (res.data.msg === 504) {
                toast.error('No availability')

            } else {
                var options = {
                    key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
                    key_secret: process.env.REACT_APP_SECRET_KEY,
                    amount: res.data.payment.amount,
                    // amount: booking_total_state,
                    currency: "INR",
                    name: "Backpackers",
                    description: "Test teansaction",
                    image: "", // add image url
                    order_id: res.data.payment.id,
                    handler: function (response) {
                        // we will handle success by calling handlePaymentSuccess method and
                        // will pass the response that we've got from razorpay
                        handlePaymentSuccess(response);
                    },
                    prefill: {
                        name: "User's name",
                        email: "User's email",
                        contact: "User's phone",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                var rzp1 = new window.Razorpay(options);
                rzp1.open();
                // return res;

            }
        });
    }
    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };

    const handlePaymentSuccess = async (response) => {
        try {
            let bodyData = new FormData();

            // const form = localStorage.getItem('form')
            // console.log(form, 'form got from local');
            // we will send the response we've got from razorpay to the backend to validate the payment
            // console.log(response, 'respose from handler');
            bodyData.append("response", JSON.stringify(response));
            bodyData.append("form", JSON.stringify(formObject))

            await axios({
                url: `${BASE_URL}/bookings/activitypayment/success/`,
                method: "POST",
                data: bodyData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res, 'bulllied');
                    const booking_id = res.data.booking_id
                    console.log(booking_id, 'handle');
                    if (res.data.msg === 200) {
                        toast.success('Booked successfully')
                        history(`/adventure-booking-success/${booking_id}`)
                        // console.log('200');
                    } else {
                        toast.error('Something went wrong ')
                    }
                    // setName("");
                    // setAmount("");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err)
                });
        } catch (error) {
            console.log(console.error());
        }
    };


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
                            <label htmlFor="first_name">First Name</label>
                            <input className='booking-input-name' type="text" name='first_name' placeholder="Participant's name"
                                onChange={formik.handleChange}
                            />
                            {formik.errors.first_name && formik.touched.first_name ? <p className='form-errors'>{formik.errors.first_name}</p> : null}
                        </div>

                        <div className="booking-checkout-input-container">
                            <label htmlFor="first_name">First Name</label>
                            <input className='booking-input-name' type="email" name='email' placeholder='Email'
                                onChange={formik.handleChange}
                            />
                        </div>



                        <div className="booking-checkout-input-container">
                            <label htmlFor="first_name">Address</label>
                            <input className='booking-input-name' type="text" name='address' placeholder='Address'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.address && formik.touched.address ? <p className='form-errors'>{formik.errors.address}</p> : null}
                        </div>
                        <div className="booking-checkout-input-container">
                            <label htmlFor="first_name">Age</label>
                            <input className='booking-input-name' type="number" name='age' placeholder="Age of participant"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div style={{ display: "flex", width: "85%" }}>
                            <div className="booking-checkout-input-container-half">
                                <label htmlFor="first_name">Activity Date</label>
                                {/* <input className='booking-input-name' type="date" name='activity_date' placeholder='Date you want to book'
                                onChange={formik.handleChange}
                            /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Check In" name='activity_date'
                                        disablePast
                                        onChange={(value) => formik.setFieldValue('activity_date', dayjs(value).format('YYYY-MM-DD'))} />
                                </LocalizationProvider>
                            </div>
                        </div>


                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <label htmlFor="first_name">Phone Number</label>
                                    <input className='booking-input-name' type="text" name='phone_number' placeholder="Contact number"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <label htmlFor="first_name">Weight</label>
                                    <input className='booking-input-name' type="number" name='weight' placeholder='Weight of participant'
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="booking-checkout-input-container">
                            <div className="adventure-booking-name-email">
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <label htmlFor="first_name">Gurdian's Name</label>
                                    <input className='booking-input-name' type="text" name='guardian_name' placeholder="Participant's guardian name"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <label htmlFor="first_name">Gurdian's Phone</label>
                                    <input className='booking-input-name' type="text" name='guardian_phone' placeholder='Phone number of guardian'
                                        onChange={formik.handleChange}
                                    />
                                </div>

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
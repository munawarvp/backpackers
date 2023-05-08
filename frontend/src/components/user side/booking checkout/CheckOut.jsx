import React, { useState, useEffect } from 'react'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik'
import { useNavigate, useLocation, json } from 'react-router-dom'
import { BookingSchema } from '../../../validations/FormValidation'

// import { useSelector } from 'react-redux'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import './checkout.css'
import { toast, Toaster } from 'react-hot-toast';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import dayjs from 'dayjs';


function CheckOut() {
  const [singleResort, setSingleResort] = useState({})
  const [coupons, setCoupns] = useState([])
  const [booking_total_state, setBookingTotal] = useState(0)
  const [Applied, setApplied] = useState(0)
  // const { resort_id } = useSelector((state) => state.booking)
  const history = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getResort();
    getCoupons();
  }, [])


  async function getResort() {
    const id = localStorage.getItem('resort_id')
    const response = await axios.get(`${BASE_URL}/resorts/singleresortpage/${id}`)
    setSingleResort(response.data)
    setBookingTotal(response.data.price)
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

  async function getCoupons() {
    const response = await axios.get(`${BASE_URL}/bookings/userlistcoupons/${user_id}`)
    setCoupns(response.data)
  }

  let formObject = {}

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
      booking_total: booking_total_state,
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
      form.append('booking_total', booking_total_state)
      form.append('payment_method', values.payment_method)
      form.append('occupancy', values.occupancy)
      form.append('coupon_id', Applied)

      if (values.payment_method === 'Pay at desk') {
        const response = await axios.post(`${BASE_URL}/bookings/createbookingresort/`, form)
        const booking_id = response.data.booking_id
        if (response.data.msg === 200) {
          history(`/booking-success/${booking_id}`)
        } else if (response.data.msg === 504) {
          toast.error('No availability')
        } else {
          toast.error('Something went wrong')
        }
      } else if (values.payment_method === 'Razorpay') {



        formObject = Object.fromEntries(form.entries());


        // localStorage.setItem('form', form)
        
        showRazorpay();
      }

    }
  })


  function couponApplied(discount_amount, coupon_id) {
    const discounted = booking_total_state - discount_amount
    setBookingTotal(discounted)
    setApplied(coupon_id)
  }
  // console.log(Applied, "applied");

  function cancelCouponApply(discount_amount) {
    setBookingTotal(singleResort.price)
    setApplied(0)
  }

  const showRazorpay = async () => {
    const res = loadScript();
    // console.log(formData, 'formData');
    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", booking_total_state.toString());
    bodyData.append("form", JSON.stringify(formObject))

    const data = await axios({
      url: `${BASE_URL}/bookings/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      console.log(res, 'res');
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
      console.log(formObject, 'formObject from handler');
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("form", JSON.stringify(formObject))

      await axios({
        url: `${BASE_URL}/bookings/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          // setName("");
          // setAmount("");
        })
        .catch((err) => {
          console.log(err);
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
              <div style={{ width: "60%", display: "flex", gap: "1rem", marginBottom: "20px" }}>
                {/* <input className='booking-input-date' type="date" name='check_in' placeholder='Check In'
                  onChange={formik.handleChange}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className='date-picker-mu' label="Check In" name='check_in' onChange={(value) => formik.setFieldValue('check_in', dayjs(value).format('YYYY-MM-DD'))} />
                </LocalizationProvider>
                {formik.errors.check_in && formik.touched.check_in ? <p className='form-errors'>{formik.errors.check_in}</p> : null}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className='date-picker-mu' label="Check Out" name='check_out' onChange={(value) => formik.setFieldValue('check_out', dayjs(value).format('YYYY-MM-DD'))} />
                </LocalizationProvider>
                {formik.errors.check_out && formik.touched.check_out ? <p className='form-errors'>{formik.errors.check_out}</p> : null}
              </div>
              <div style={{ width: "100%" }}>
                {/* <input className='booking-input-date' type="date" name='check_out' placeholder='Check Out'
                  onChange={formik.handleChange}
                /> */}

              </div>
              <div style={{ width: "100%" }}>
                <input className='booking-input-name' type="number" name='occupancy' placeholder='Number of guests'
                  onChange={formik.handleChange}
                />
                {formik.errors.occupancy && formik.touched.occupancy ? <p className='form-errors'>{formik.errors.occupancy}</p> : null}
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
                <h4>{booking_total_state} ₹</h4>
              </div>

              <p>Coupons </p>
              {/* <div className="booking-details-small">
                <p>1x Night and 1x Day </p>
              </div> */}

              <div className="booking-coupon-list-contain">
                {coupons.map((item) => (<div className="single-booking-coupon">
                  <h3>{item.coupon.code}</h3>
                  {Applied ?
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <p className='coupon-applied-text'>Applied</p>
                      <AiOutlineCloseCircle style={{ cursor: "pointer" }} size={23} onClick={() => cancelCouponApply(item.coupon.discount_amount)} />
                    </div> :
                    <p className='coupon-apply-text' onClick={() => couponApplied(item.coupon.discount_amount, item.coupon.id)}>Apply</p>}
                </div>))}

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
                    Pay at checkIn
                  </label>
                </div>
              </div>
              <div className="booking-btn-container">
                <button className="booking-btn" type='submit'>Book Now</button>
                <button className="razorpay-booking-btn" type='submit'>Pay with razorpay</button>
              </div>

            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckOut
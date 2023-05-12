import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth'

import Background from '../../../images/user-profile.webp'
import Background2 from '../../../images/bookings.jpg'
import Background3 from '../../../images/background3.jpg'
import Background4 from '../../../images/background4.jpg'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './userprofile.css'
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';

import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function UserProfile() {
    const [singleUser, setSingleUser] = useState({})
    const [userProfile, setUserProfile] = useState({})
    const [bookings, setBookings] = useState([])
    const [activityBookings, setActivityBookings] = useState([])
    const [coupons, setCoupons] = useState([])
    const [toggle, setToggle] = useState(1)
    const [value, setValue] = useState(0);


    const token = getLocal()
    const { user_id } = jwtDecode(token)

    useEffect(() => {
        getUser();
        getBookings();
        getActivityBookings()
        getCoupons();
    }, [])

    async function getUser() {
        const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}`)
        console.log(response);
        setSingleUser(response.data.user)
        setUserProfile(response.data.user_profile)
    }
    async function getBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/userresortbookings/${user_id}`)
        setBookings(response.data)
    }
    async function getActivityBookings() {
        const response = await axios.get(`${BASE_URL}/bookings/useractivitybookings/${user_id}`)
        setActivityBookings(response.data)
    }
    async function getCoupons() {
        const response = await axios.get(`${BASE_URL}/bookings/userlistcoupons/${user_id}`)
        setCoupons(response.data)
    }


    const formik = useFormik({
        initialValues: {
            user: user_id,
            address: '',
            city: '',
            state: '',
            country: '',
            profile_img: null
        },
        onSubmit: async values => {
            const form = new FormData()
            form.append('user', values.user)
            form.append('address', values.address)
            form.append('city', values.city)
            form.append('state', values.state)
            form.append('country', values.country)
            form.append('profile_img', values.profile_img)

            const response = await axios.put(`${BASE_URL}/api/userprofiledetails/${user_id}`, form)
            console.log(response);
            if (response.data.msg === 200) {
                toast.success('Profile updated')
                getUser();
                setToggle(1)
            } else {
                toast.error('Something went wrong')
            }
        }
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cancelBooking = async (booking_id) => {
        console.log(booking_id);
        const response = await axios.get(`${BASE_URL}/bookings/cancelresortbooking/${booking_id}`)
        if (response.data.msg === 200) {
            getBookings();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    }

    const handleCancel = (booking_id) => {
        Swal.fire({
            title: 'Do you really want to cancel the booking?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(booking_id);
                const response = cancelBooking(booking_id)
                console.log(response);

            }
        })
    }
    

    return (
        <div className="user-profile-main-container">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h2>Your Profile</h2>
            <div className="user-img-details-container">
                <div className="user-img-details-contain">

                    <div className="user-profile-card-contain">
                        <div className="user-profile-pic-contain">
                            <img className='user-profile-picture' src={`${BASE_URL}/${userProfile.profile_img}`} alt="" />
                        </div>
                        <div className="profile-details-contain">
                            <h2>{singleUser.username}</h2>
                            <h4>{singleUser.email}</h4>
                            <h4>{singleUser.phone_number}</h4>
                        </div>

                        <button className="edit-user-profile-btn" onClick={() => setToggle(1)}>Your Profile</button>
                        <button className="edit-user-profile-btn" onClick={() => setToggle(2)}>Edit Profile</button>
                        <button className="edit-user-profile-btn" onClick={() => setToggle(3)}>Your Bookings</button>
                        <button className="edit-user-profile-btn" onClick={() => setToggle(4)}>Coupons & Rewards</button>
                    </div>
                </div>
                {toggle === 1 && <div className="user-profile-all-details">
                    <div className="all-details-img-container">
                        <img className='user-detail-img' src={Background} alt="" />
                    </div>
                    <p>Your Account Details</p>
                    <div className="details-caption-values-contain">
                        <div className="details-captions-contain">
                            <h5 className="single-detail-caption">Username :</h5>
                            <h5 className="single-detail-caption">First Name :</h5>
                            <h5 className="single-detail-caption">Last Name :</h5>
                            <h5 className="single-detail-caption">Email :</h5>
                            <h5 className="single-detail-caption">Phone Number :</h5>
                            <h5 className="single-detail-caption">Additional Details</h5>
                            <h5 className="single-detail-caption">Address</h5>
                            <h5 className="single-detail-caption">City</h5>
                            <h5 className="single-detail-caption">State</h5>

                        </div>
                        {/* <div className="details-values-contain"> */}
                        <div className="details-values-contain">
                            <h5 className="single-detail-caption">{singleUser.username}</h5>
                            <h5 className="single-detail-caption">{singleUser.first_name}</h5>
                            <h5 className="single-detail-caption">{singleUser.last_name}</h5>
                            <h5 className="single-detail-caption">{singleUser.email}</h5>
                            <h5 className="single-detail-caption">{singleUser.phone_number}</h5>
                            <h5 className="single-detail-caption">-</h5>
                            <h5 className="single-detail-caption">{userProfile.address}</h5>
                            <h5 className="single-detail-caption">{userProfile.city}</h5>
                            <h5 className="single-detail-caption">{userProfile.state}</h5>
                        </div>
                        {/* </div> */}
                    </div>
                </div>}
                {toggle === 2 && <div className="user-profile-all-details">
                    <div className="all-details-img-container">
                        <img className='user-detail-img' src={Background2} alt="" />
                    </div>
                    <p>Edit Account Details</p>
                    <div className="details-caption-values-contain">
                        <div className="edit-profile-form-container">
                            <form onSubmit={formik.handleSubmit} className="edit-profile-form">
                                <div className="profile-input-row">
                                    {/* <input className='edit-profile-input' type="text" name='phone_number' placeholder='phone number'
                                        {...register('phone_number')}
                                    /> */}
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">Address</label>
                                        <input className='edit-profile-input' type="text" name='address' placeholder='address'
                                            // {...register('address')}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">Zipcode</label>
                                        <input className='edit-profile-input' type="text" name='zipcode' placeholder='zipcode'
                                            // {...register('zipcode')}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">City</label>
                                        <input className='edit-profile-input' type="text" name='city' placeholder='city'
                                            // {...register('city')}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">State</label>
                                        <input className='edit-profile-input' type="text" name='state' placeholder='state'
                                            // {...register('state')}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">Country</label>
                                        <input className='edit-profile-input' type="text" name='country' placeholder='country'
                                            // {...register('country')}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="user-profile-input-container">
                                        <label htmlFor="address">Profile Picture</label>
                                        <input className='edit-profile-file-input' type="file" name='profile_img'
                                            onChange={e => formik.setFieldValue('profile_img', e.target.files[0])}
                                        />
                                    </div>
                                    <button className='edit-profile-btn'>Edit Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}

                {toggle === 3 && <div className="user-profile-all-details">
                    <div className="all-details-img-container">
                        <img className='user-detail-img' src={Background3} alt="" />
                    </div>
                    <p>Your Bookings</p>
                    <div className="resort-subheading-container">
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Resort Bookings" />
                                <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Adventure Bookings" />

                            </Tabs>
                        </Box>
                    </div>
                    {value === 0 && <div className="user-bookings-list-contain">
                        {bookings.map(booking => {
                            const isCancelled = booking.status === 'Cancelled';
                        return(
                            <div className="user-single-booking-card">
                                <div className="booking-card-details">
                                    <p> <b>Booking Id :</b> {booking.booking_id}</p>
                                    <p><b> Guest Name :</b>{booking.user.first_name}</p>
                                    <p><b>Check In :</b> {booking.check_in} </p>
                                    <p><b>Check Out :</b> {booking.check_out} </p>
                                </div>
                                <div className="booking-card-details">
                                    <p><b>Booked Resort:</b> {booking.booked_resort.resort_name}</p>
                                    <p><b>Number of guests:</b> {booking.occupancy}</p>
                                    <p><b>Total Amount :</b> {booking.booking_total}</p>
                                    <p><b>Status :</b> {booking.status}</p>
                                </div>
                                <div className="booking-resort-img-contain">
                                    <img className='booked-resort-img' src={`${BASE_URL}/${booking.booked_resort.image_one}`} alt="" />
                                </div>
                                {!isCancelled && <div className='booking-cancel-btn-contain'>
                                    <CancelIcon onClick={() => handleCancel(booking.id)} style={{ fontSize: "35px", cursor: "pointer", color: "#ff4e4e" }} />
                                </div>}
                            </div>
                        )})}
                    </div>}
                    {value === 1 && <div className="user-bookings-list-contain">
                        {activityBookings.map(booking => (
                            <div className="user-single-booking-card">
                                <div className="booking-card-details">
                                    <p> <b>Booking Id :</b> {booking.booking_id}</p>
                                    <p><b>Guest Name :</b>{booking.user.first_name}</p>
                                    <p><b>Activity Date :</b> {booking.activity_date} </p>
                                    <p><b>Booked Activity:</b> {booking.booked_activity.activity_name} </p>
                                </div>
                                <div className="booking-card-details">
                                    <p><b>Phone Number:</b> {booking.guardian_name}</p>
                                    <p><b>Gurdian:</b> {booking.phone_number}</p>
                                    <p><b>Payment Method:</b> {booking.payment_method}</p>
                                    <p><b>Total Amount :</b> {booking.booking_total}</p>
                                </div>
                                <div className="booking-resort-img-contain">
                                    <img className='booked-resort-img' src={`${BASE_URL}/${booking.booked_activity.activity_one}`} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>}

                {toggle === 4 && <div className="user-profile-all-details">
                    <div className="all-details-img-container">
                        <img className='user-detail-img' src={Background4} alt="" />
                    </div>
                    <p>Your Coupons</p>
                    <div className="user-coupons-list-contain">
                        {coupons.map((coupon) => (<div className="user-single-coupon-card">
                            <div className="single-coupon-head">
                                <p>{coupon.coupon.coupon_name}</p>
                            </div>
                            <p>{coupon.coupon.code}</p>
                            <p>{coupon.coupon.expiration_date}</p>
                            <p className='coupon-view-details'>view details</p>
                        </div>))}

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default UserProfile
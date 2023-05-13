import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { Button } from 'antd';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiWifiOff } from 'react-icons/bi'
import { BsWifi } from 'react-icons/bs'
import { MdPool } from 'react-icons/md'
import Point from '../../../images/marker.png'
import { useDispatch } from 'react-redux';
import { updateResortId } from '../../../redux/bookingSlice';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapbox_access_token } from '../../../utils/config';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik'

import Profile from '../../../images/img3.png'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

import './singleresort.css'
import { Toaster, toast } from 'react-hot-toast';
import { IoMdCloseCircle } from 'react-icons/io';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useForm } from 'react-hook-form';

function SingleResort() {
    const [locationList, setLocationlist] = useState([])
    const [singleResort, setSingleResort] = useState({})
    const [reviews, setReviews] = useState([])
    const [value, setTabValue] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [available, setAvailable] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)

    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()

    const { register, handleSubmit, setValue, watch } = useForm();

    useEffect(() => {
        locations();
        getResort();
        getReviews();
    }, [])

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });

    const resort_id = useParams()
    dispatch(updateResortId(resort_id.id))

    // console.log(typeof (singleResort.map_location));
    // console.log(singleResort.map_location ? singleResort.map_location.split(',') : null);
    const [lat, lng] = singleResort.map_location ? singleResort.map_location.split(',') : []

    async function getResort() {
        const response = await axios.get(`${BASE_URL}/resorts/singleresortpage/${resort_id.id}`)
        setSingleResort(response.data)
    }

    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }

    async function getReviews() {
        const response = await axios.get(`${BASE_URL}/bookings/getresortreview/${resort_id.id}`)
        setReviews(response.data)
    }


    const handleBooking = (resort_id) => {
        localStorage.setItem('resort_id', resort_id)
        history('/booking-checkout')
    }
    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    let user_id = ''
    const token = getLocal()
    // console.log(token);
    if (token) {
        const decoded = jwtDecode(token)
        user_id = decoded.user_id

    }

    const formik = useFormik({
        initialValues: {
            user: user_id,
            resort: resort_id.id,
            review_heading: '',
            description: '',
            rating: null,
            review_image: null
        },
        onSubmit: async (values, { resetForm }) => {
            const form = new FormData()
            form.append('user', values.user)
            form.append('resort', values.resort)
            form.append('review_heading', values.review_heading)
            form.append('description', values.description)
            form.append('rating', values.rating)
            form.append('review_image', values.review_image)
            

            const response = await axios.post(`${BASE_URL}/bookings/addresortreview/`, form)
            if (response.data.msg === 501) {
                localStorage.setItem('location', location.pathname)
                history('/login')
            } else if (response.data.msg === 500) {
                toast.error('Something went wrong')
            } else if (response.data.msg === 404) {
                toast.error('You didnt booked this resort yet')
            } else if (response.data.msg === 502) {
                toast.error('You already added review')
            } else if (response.data.msg === 503) {
                toast.error('You are not checked in yet')
            } else if (response.data.msg === 200) {
                toast.success('Review added..!')
                getReviews();
            }
            resetForm({ values: "" })
        }

    })

    async function deleteReview(id) {
        const response = await axios.delete(`${BASE_URL}/bookings/deleteresortreview/${id}`)
        if (response.data.msg === 200) {
            toast.success('Review deleted')
            getReviews();
        } else {
            toast.error('Something went wrong')
        }
    }

    async function onSubmit(data) {
        console.log(data);
        data['checking_resort'] = singleResort.id
        console.log(data);
        const date=JSON.stringify(data)
        console.log(typeof(date));
        const response = await axios.get(`${BASE_URL}/bookings/checkresortavailability/${date}`)
        
        if (response.data.msg === 200) {
            setNotAvailable(false)
            setAvailable(true)
            toast.success('Resort Available')
        } else if(response.data.msg === 504){
            setAvailable(false)
            setNotAvailable(true)
            toast.error('Resort not available')
        } else {
            toast.error('Something went wrong')
        }
    }
    const toggleOff = ()=> {
        setToggle(!toggle)
        setNotAvailable(false)
        setAvailable(false)
    }
    return (
        <div className="user-resortlist-main">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div className="resort-search-filter">
                <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    <div>
                        <label htmlFor="location">Locations</label>
                        <Select className='drop-locations' options={loctions} value={loctions[0]} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="first_name">Check In</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Check I" name='check_out' />
                        </LocalizationProvider>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="first_name">Check Out</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Check Out" name='check_out' />
                        </LocalizationProvider>
                    </div>
                    <Button type="primary" icon={<AiOutlineSearch />}>Search</Button>
                </div>
                <div className="total-count-resort">
                    <h3>Total number of resorts : 20</h3>
                </div>
            </div>
            <div className="breadcremps">
                <p>Home {'>'}</p>
                <p>Resorts {'>'}</p>
                <p>{singleResort.resort_name}</p>
            </div>

            <div className="single-resort-main">
                <div className="single-resort-img-container">
                    <div className="single-resort-first-img-container">
                        <img className='single-resort-first-image' src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${singleResort.image_two}`} alt="" />
                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${singleResort.image_three}`} alt="" />
                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${singleResort.image_four}`} alt="" />
                        </div>
                    </div>
                </div>

                <div className="single-heading-container">
                    <div className="single-resort-heading">
                        <h2>{singleResort.resort_name}</h2>
                        <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                        <p className='single-resort-place'>{singleResort.address}</p>
                    </div>
                    <div className="single-resort-price">
                        <h2>{singleResort.price} ₹</h2>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className='availability-btn' onClick={() => setToggle(!toggle)} >Check Availability</button>
                            <button className='book-now-btn' onClick={() => handleBooking(singleResort.id)} >Book Now</button>
                        </div>

                    </div>
                </div>

                {toggle && <div className='check-availability-popup'>
                    <div className="pending-reso-details">
                        <div className='resort-name-toggle'>
                            <h2>Check Availability</h2>
                            <IoMdCloseCircle size={30} onClick={toggleOff} />
                        </div>
                        <div className="check-availability-input-contain">
                            <form className='check-availability-form' onSubmit={handleSubmit(onSubmit)}>
                                <div className="checkavailability-input-container">
                                    <label htmlFor="first_name">Check In</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Check In" name="check_in"
                                            // value={check_in}
                                            onChange={(newValue) => setValue("check_in", newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="checkavailability-input-container">
                                    <label htmlFor="first_name">Check Out</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Check Out" name="check_out"
                                            // value={check_out}
                                            onChange={(newValue) => setValue("check_out", newValue)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <button className="checkavailability-btn" type='submit'>Check</button>
                            </form>
                            {available && <div className="resort-available-container">
                                <h3>AVAILABLE</h3>
                            </div>}
                            {notAvailable && <div className="resort-notavailable-container">
                                <h3>NOT AVAILABLE</h3>
                            </div>}
                        </div>
                    </div>
                </div>}

                <div className="resort-subheading-container">
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Overview" />
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Location" />
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Reviews" />
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Similar Stays" />
                        </Tabs>
                    </Box>
                </div>

                <div className="resort-overview-container">
                    {value === 0 && <div className='overview-shadow'>
                        <div className="resort-overview">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">{singleResort.place}</p>
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">{singleResort.address}</p>
                            <p className="resort-overview-place">Owner : {singleResort.owner ? singleResort.owner.username : null}</p>
                            <p className="resort-overview-place">Owner Email : {singleResort.owner ? singleResort.owner.email : null}</p>
                            <p className="resort-overview-place">Owner Phone : {singleResort.owner ? singleResort.owner.phone_number : null}</p>
                            <p className="resort-overview-place">Phone : {singleResort.phone_number}</p>
                            <p className="resort-overview-place">{singleResort.description}</p>
                        </div>
                        <div className="resort-room-type">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">Room Type </p>
                            <p className="resort-overview-place">{singleResort.room_type}, The BHK full form is bedroom, hall and kitchen. It is used to convey the number of rooms in a property. For example, a 2BHK means that the particular property has two bedrooms, one hall and a kitchen. A 1 BHK means that the property has one bedroom, one hall and a kitchen. </p>
                            <div style={{ display: "flex", gap: "20px" }}>
                                {singleResort.wifi_available ? <p>Wifi available <BsWifi size={30} /></p> : <p>Wifi not available <BiWifiOff size={30} /></p>}
                                {singleResort.pool_available ? <p>pool available <MdPool size={30} /></p> : <p>pool not available <MdPool size={30} /></p>}

                            </div>
                        </div>

                    </div>}



                    {value === 1 && singleResort.map_location && <div className="resort-map-location">
                        <p style={{ fontWeight: "bold" }} className="resort-overview-place">Location :</p>
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            zoom={[14]}
                            center={[lng, lat]}
                            containerStyle={{
                                height: '30rem',
                                width: '100%'
                            }}
                        >
                            <Marker coordinates={[lng, lat]} anchor="bottom">
                                <img height={35} src={Point} alt="Marker" />
                            </Marker>
                        </Map>
                    </div>}

                    {value === 2 && <div className="resort-review-main-contain">
                        <div className="resort-review-heading">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">Reviews :</p>

                        </div>

                        {reviews.map((review) => (
                            <div className="resort-single-review-contain">
                                <div className='review-single-inside'>
                                    <div>
                                        <div className="profile-img-name-rating">
                                            <div className="review-profile-img-container">
                                                <img className='review-user-img' src={Profile} alt="" />
                                            </div>
                                            <div className="review-name-rating">
                                                <h3>{review.review_heading}</h3>
                                                {/* <h3>{review.rating}</h3> */}
                                                {/* { review.rating && review.rating.map((star)=>(
                                                    <AiFillStar color='yellow' />
                                                ))} */}
                                                ({review.rating})
                                                {[...Array(review.rating)].map((star) => (
                                                    <AiFillStar color='yellow' />
                                                ))}


                                                {/* <AiFillStar color='black' /> */}
                                            </div>
                                        </div>
                                        <div className="resort-review-description">
                                            <p>{review.description}</p>
                                        </div>
                                    </div>
                                    <div className="resort-review-img-contain">
                                        <div onClick={() => deleteReview(review.id)} className="delete-review-contain">
                                            <DeleteIcon />
                                        </div>

                                        {review.review_image && <div className="resort-review-single-img">
                                            <img className='review-single-img' src={`${BASE_URL}/${review.review_image}`} alt="" />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        ))}



                        <div className="review-form-main-container">
                            <div className='review-form-half'>
                                <div className="resort-review-heading">
                                    <p style={{ fontWeight: "bold" }} className="resort-overview-place">Add Your Reviews :</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="add-review-form">
                                    <div className="review-input-contain">
                                        <label htmlFor="review_heading">Heading</label>
                                        <input className='review-add-input' name='review_heading' type="text" placeholder='heading'
                                            onChange={formik.handleChange}
                                            value={formik.values.review_heading}
                                        />
                                    </div>
                                    <div className="review-input-contain">
                                        <label htmlFor="description">Description</label>
                                        <textarea className='review-add-input review-textarea' name="description" placeholder='description'
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        ></textarea>
                                    </div>
                                    <div className="review-rating-img-contain">
                                        <div className="review-input-contain">
                                            <Typography component="legend">Review Rating</Typography>
                                            <Rating
                                                name="rating"
                                                onChange={formik.handleChange}
                                                value={formik.values.rating}
                                            />
                                        </div>
                                        <div className="review-input-contain">
                                            <label htmlFor="review-image">Review Image</label>
                                            <input name='review_image' type="file"
                                                onChange={e => formik.setFieldValue('review_image', e.target.files[0])}
                                                
                                            />
                                        </div>
                                    </div>
                                    <input className='add-review-btn' type="submit" value='Add Review' />
                                </form>
                            </div>

                        </div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default SingleResort
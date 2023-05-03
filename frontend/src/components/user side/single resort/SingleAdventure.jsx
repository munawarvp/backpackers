import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Profile from '../../../images/img3.png'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';

function SingleAdventure() {
    const [locationList, setLocationlist] = useState([])
    const [SingleAdventure, setSingleAdventure] = useState({})
    const [reviews, setReviews] = useState([])
    const [value, setValue] = useState(0);

    const history = useNavigate()
    const resort_id = useParams()
    const location = useLocation()

    useEffect(() => {
        locations();
        getActivity();
        getReviews();
    }, [])

    

    async function getActivity() {
        const response = await axios.get(`${BASE_URL}/resorts/getadventuredetail/${resort_id.id}`)
        setSingleAdventure(response.data)
    }
    

    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }

    async function getReviews() {
        const response = await axios.get(`${BASE_URL}/bookings/getadventurereview/${resort_id.id}`)
        setReviews(response.data)
    }

    let user_id = ''
    const token = getLocal()
    if (token) {
        const decoded = jwtDecode(token)
        user_id = decoded.user_id
    }

    const formik = useFormik({
        initialValues: {
            user: user_id,
            adventure: resort_id.id,
            review_heading: '',
            description: '',
            rating: null,
            review_image: null
        },
        onSubmit: async values => {
            const form = new FormData()
            form.append('user', values.user)
            form.append('adventure', values.adventure)
            form.append('review_heading', values.review_heading)
            form.append('description', values.description)
            form.append('rating', values.rating)
            form.append('review_image', values.review_image)

            const response = await axios.post(`${BASE_URL}/bookings/addadventurereview/`, form)
            if (response.data.msg === 501) {
                localStorage.setItem('location', location.pathname)
                history('/login')
            } else if (response.data.msg === 500) {
                toast.error('Something went wrong')
            } else if (response.data.msg === 404) {
                toast.error('You didnt booked this resort yet')
            } else if (response.data.msg === 200) {
                toast.success('Review added..!')
                getReviews();
            }
            else{
                toast.error('something went wrong')
            }
        }
    })

    const handleBooking = (activity_id) => {
        localStorage.setItem('activity_id', activity_id)
        history('/adventure-checkout')
    }
    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                        <label htmlFor="check_in">Check In</label>
                        <DatePicker className='date-for-checkin' />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="check_out">Check Out</label>
                        <DatePicker className='date-for-checkin' />
                    </div>
                    <Button type="primary" icon={<AiOutlineSearch />}>Search</Button>
                </div>
                <div className="total-count-resort">
                    <h3>Total number of resorts : 20</h3>
                </div>
            </div>
            <div className="breadcremps">
                <p>Home {'>'}</p>
                <p>Adventures {'>'}</p>
                <p>{SingleAdventure.activity_name}</p>
            </div>

            <div className="single-resort-main">
                <div className="single-resort-img-container">
                    <div className="single-resort-first-img-container">
                        <img className='single-resort-first-image' src={`${BASE_URL}/${SingleAdventure.activity_one}`} alt="" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_two}`} alt="" />

                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_three}`} alt="" />

                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_one}`} alt="" />

                        </div>
                    </div>
                </div>

                <div className="single-heading-container">
                    <div className="single-resort-heading">
                        <h2>{SingleAdventure.activity_name}</h2>
                        <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                        <p className='single-resort-place'>{SingleAdventure.place}</p>
                    </div>
                    <div className="single-resort-price">
                        <h2>{SingleAdventure.price} ₹</h2>
                        <button className='book-now-btn' onClick={() => handleBooking(SingleAdventure.id)}>Book Now</button>
                    </div>
                </div>

                <div className="resort-subheading-container">
                    {/* <div className="resort-subheading">
                        <div className="nav-sub-heading">
                            <h3>Overview</h3>
                        </div>
                        <div className="nav-sub-heading">
                            <h3>Location</h3>
                        </div>
                        <div className="nav-sub-heading">
                            <h3>Reviews</h3>
                        </div>
                        <div className="nav-sub-heading">
                            <h3>Similar Activities</h3>
                        </div>
                    </div> */}

                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Overview" />
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Reviews" />
                            <Tab style={{ marginRight: "3rem", fontWeight: "bold", fontSize: "18px" }} label="Similar Activity" />
                        </Tabs>
                    </Box>
                </div>

                <div className="resort-overview-container">
                    {value == 0 && <div className="overview-shadow">
                        <div className="resort-overview">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">Place : {SingleAdventure.place}</p>
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">{SingleAdventure.address}</p>
                            <p className="resort-overview-place">Owner : {SingleAdventure.owner ? SingleAdventure.owner.username : null}</p>
                            <p className="resort-overview-place">Type : {SingleAdventure.activity_type}</p>
                            <p className="resort-overview-place">Time : {SingleAdventure.time_take} minutes</p>
                            <p className="resort-overview-place">{SingleAdventure.about}</p>
                            <p className="resort-overview-place">Safety : {SingleAdventure.safety}</p>
                        </div>
                    </div>}

                    {value == 1 && <div className="resort-review-main-contain">
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
                                            {[...Array(review.rating)].map((star)=>(
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
                                        <div className="resort-review-single-img">
                                            <img className='review-single-img' src={`${BASE_URL}/${review.review_image}`} alt="" />
                                        </div>
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
                                        />
                                    </div>
                                    <div className="review-input-contain">
                                        <label htmlFor="description">Description</label>
                                        <textarea className='review-add-input review-textarea' name="description" placeholder='description'
                                            onChange={formik.handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="review-rating-img-contain">
                                        <div className="review-input-contain">
                                            <Typography component="legend">Review Rating</Typography>
                                            <Rating
                                                name="rating"
                                                onChange={formik.handleChange}
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

export default SingleAdventure
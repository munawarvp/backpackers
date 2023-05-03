import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../utils/config'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapbox_access_token } from '../../../utils/config';


import Point from '../../../images/marker.png'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'

import Profile from '../../../images/img3.png'
import Resort from '../../../images/resort2.webp'

function SingleDestination() {
    const [SingleDestination, setSingleDestination] = useState({})
    const [locationList, setLocationlist] = useState([])
    const [reviews, setReviews] = useState([])
    const [value, setValue] = useState(0)

    const destination_id = useParams()
    const location = useLocation()
    const history = useNavigate()

    useEffect(() => {
        locations();
        getDestination();
        getReviews();
    }, [])

    async function getDestination() {
        const response = await axios(`${BASE_URL}/resorts/getdestinationdetail/${destination_id.id}`)
        setSingleDestination(response.data)
    }
    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }
    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })

    async function getReviews() {
        const response = await axios.get(`${BASE_URL}/bookings/getdestinationreview/${destination_id.id}`)
        setReviews(response.data)
    }

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });
    const [lat, lng] = SingleDestination.map_location ? SingleDestination.map_location.split(',') : []

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    let user_id = ''
    const token = getLocal()
    if (token) {
        const decoded = jwtDecode(token)
        user_id = decoded.user_id
    }

    const formik = useFormik({
        initialValues: {
            user: user_id,
            destination: destination_id.id,
            review_heading: '',
            description: '',
            rating: null,
            review_image: null
        },
        onSubmit: async values => {
            const form = new FormData()
            form.append('user', values.user)
            form.append('destination', values.destination)
            form.append('review_heading', values.review_heading)
            form.append('description', values.description)
            form.append('rating', values.rating)
            form.append('review_image', values.review_image)

            const response = await axios.post(`${BASE_URL}/bookings/adddestinationreview/`, form)
            if (response.data.msg === 501) {
                localStorage.setItem('location', location.pathname)
                history('/login')
            } else if (response.data.msg === 500) {
                toast.error('Something went wrong')
            } else if (response.data.msg === 200) {
                toast.success('Review added..!')
                getReviews();
            }
            else {
                toast.error('something went wrong')
            }
        }
    })
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
                <p>Resorts {'>'}</p>
                <p>{SingleDestination.spot_name}</p>
            </div>

            <div className="single-resort-main">
                <div className="single-resort-img-container">
                    <div className="single-resort-first-img-container">
                        <img className='single-resort-first-image' src={`${BASE_URL}/${SingleDestination.image_one}`} alt="" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleDestination.image_two}`} alt="" />
                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleDestination.image_three}`} alt="" />
                        </div>
                        <div className="single-resort-rest-img-container">
                            <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleDestination.image_one}`} alt="" />
                        </div>
                    </div>
                </div>

                <div className="single-heading-container">
                    <div className="single-resort-heading">
                        <h2>{SingleDestination.spot_name}</h2>
                        <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                        <p className='single-resort-place'>{SingleDestination.place}</p>
                    </div>

                </div>

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
                    {value == 0 && <div className='overview-shadow'>
                        <div className="resort-overview">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">{SingleDestination.place}</p>
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">{SingleDestination.address}</p>
                            <p className="resort-overview-place">Owner : {SingleDestination.owner ? SingleDestination.owner.username : null}</p>
                            <p className="resort-overview-place">Owner Email : {SingleDestination.owner ? SingleDestination.owner.email : null}</p>
                            <p className="resort-overview-place">Owner Phone : {SingleDestination.owner ? SingleDestination.owner.phone_number : null}</p>
                            <p className="resort-overview-place">Near To : {SingleDestination.resort ? SingleDestination.resort.resort_name : null}</p>

                            <p className="resort-overview-place">{SingleDestination.about}</p>
                        </div>
                        <div className="resort-room-type">
                            <p style={{ fontWeight: "bold" }} className="resort-overview-place">More Details </p>
                            <p className="resort-overview-place">Start Time :{SingleDestination.start_time}</p>
                            <p className="resort-overview-place">Close Time :{SingleDestination.close_time}</p>

                        </div>

                    </div>}



                    {value == 1 && SingleDestination.map_location && <div className="resort-map-location">
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

                    {value == 2 && <div className="resort-review-main-contain">
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
                                            <input name='review-image' type="file"
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

export default SingleDestination
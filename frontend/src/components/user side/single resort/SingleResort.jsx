import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom';
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

import Profile from '../../../images/img3.png'
import Resort from '../../../images/resort2.webp'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

import './singleresort.css'

function SingleResort() {
    const [locationList, setLocationlist] = useState([])
    const [singleResort, setSingleResort] = useState({})
    const [value, setValue] = useState(0);

    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        locations();
        getResort();
    }, [])

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });

    const resort_id = useParams()
    dispatch(updateResortId(resort_id.id))

    console.log(typeof (singleResort.map_location));
    console.log(singleResort.map_location ? singleResort.map_location.split(',') : null);
    const [lat, lng] = singleResort.map_location ? singleResort.map_location.split(',') : []

    async function getResort() {
        const response = await axios.get(`${BASE_URL}/resorts/singleresortpage/${resort_id.id}`)
        setSingleResort(response.data)
    }

    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
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
        setValue(newValue);
    };
    return (
        <div className="user-resortlist-main">
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
                            <button className='availability-btn' onClick={() => handleBooking(singleResort.id)} >Check Availability</button>
                            <button className='book-now-btn' onClick={() => handleBooking(singleResort.id)} >Book Now</button>
                        </div>

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



                    {value == 1 && singleResort.map_location && <div className="resort-map-location">
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


                        <div className="resort-single-review-contain">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <div className="profile-img-name-rating">
                                        <div className="review-profile-img-container">
                                            <img className='review-user-img' src={Profile} alt="" />
                                        </div>
                                        <div className="review-name-rating">
                                            <h3>UserName</h3>
                                            <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                                        </div>
                                    </div>
                                    <div className="resort-review-description">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga adipisci odit non sint assumenda illo facere eligendi quas est ipsam alias, harum dolore quaerat, veritatis, molestias praesentium quod voluptatem voluptatum.</p>
                                    </div>
                                </div>
                                <div className="resort-review-img-contain">
                                    <div className="resort-review-single-img">
                                        <img className='review-single-img' src={Resort} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="resort-single-review-contain">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <div className="profile-img-name-rating">
                                        <div className="review-profile-img-container">
                                            <img className='review-user-img' src={Profile} alt="" />
                                        </div>
                                        <div className="review-name-rating">
                                            <h3>UserName</h3>
                                            <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                                        </div>
                                    </div>
                                    <div className="resort-review-description">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga adipisci odit non sint assumenda illo facere eligendi quas est ipsam alias, harum dolore quaerat, veritatis, molestias praesentium quod voluptatem voluptatum.</p>
                                    </div>
                                </div>
                                <div className="resort-review-img-contain">
                                    <div className="resort-review-single-img">
                                        <p>4 days ago</p>
                                        <img className='review-single-img' src={Resort} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="review-form-main-container">
                            <div className='review-form-half'>
                                <div className="resort-review-heading">
                                    <p style={{ fontWeight: "bold" }} className="resort-overview-place">Add Your Reviews :</p>
                                </div>
                                <form action="" className="add-review-form">
                                    <div className="review-input-contain">
                                        <label htmlFor="review_heading">Heading</label>
                                        <input className='review-add-input' name='review_heading' type="text" placeholder='heading' />
                                    </div>
                                    <div className="review-input-contain">
                                        <label htmlFor="description">Description</label>
                                        <textarea className='review-add-input review-textarea' name="description" placeholder='description'></textarea>
                                    </div>
                                    <div className="review-rating-img-contain">
                                        <div className="review-input-contain">
                                            <Typography component="legend">Review Rating</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="review-input-contain">
                                            <label htmlFor="review-image">Review Image</label>
                                            <input name='review-image' type="file" />
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
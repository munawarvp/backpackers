import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiWifiOff } from 'react-icons/bi'
import { BsWifi } from 'react-icons/bs'
import { MdPool } from 'react-icons/md'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

function SingleAdventure() {
    const [locationList, setLocationlist] = useState([])
    const [SingleAdventure, setSingleAdventure] = useState({})

    const history = useNavigate()

    useEffect(() => {
        locations();
        getActivity();
    }, [])

    const resort_id = useParams()

    async function getActivity() {
        const response = await axios.get(`${BASE_URL}/resorts/getadventuredetail/${resort_id.id}`)
        setSingleAdventure(response.data)
    }

    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }
    const handleBooking = (activity_id) => {
        localStorage.setItem('activity_id', activity_id)
        history('/adventure-checkout')
    }
    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })
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
                <p>Adventures {'>'}</p>
                <p>{SingleAdventure.activity_name}</p>
            </div>

            <div className="single-resort-main">
                <div className="single-resort-img-container">
                    <img className='single-resort-first-image' src={`${BASE_URL}/${SingleAdventure.activity_one}`} alt="" />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_two}`} alt="" />
                        <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_three}`} alt="" />
                        <img className='single-resort-remaining-image' src={`${BASE_URL}/${SingleAdventure.activity_one}`} alt="" />
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
                        <button className='book-now-btn' onClick={()=>handleBooking(SingleAdventure.id)}>Book Now</button>
                    </div>
                </div>

                <div className="resort-subheading-container">
                    <div className="resort-subheading">
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
                    </div>
                </div>

                <div className="resort-overview-container">
                    <div className="resort-overview">
                        <p style={{ fontWeight: "bold" }} className="resort-overview-place">Place : {SingleAdventure.place}</p>
                        <p style={{ fontWeight: "bold" }} className="resort-overview-place">{SingleAdventure.address}</p>
                        <p className="resort-overview-place">Owner : {SingleAdventure.owner ? SingleAdventure.owner.username : null}</p>
                        <p className="resort-overview-place">Type : {SingleAdventure.activity_type}</p>
                        <p className="resort-overview-place">Time : {SingleAdventure.time_take} minutes</p>
                        <p className="resort-overview-place">{SingleAdventure.about}</p>
                        <p className="resort-overview-place">Safety : {SingleAdventure.safety}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SingleAdventure
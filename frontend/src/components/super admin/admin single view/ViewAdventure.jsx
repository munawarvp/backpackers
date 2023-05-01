import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../../../images/img2.png'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapbox_access_token } from '../../../utils/config';
import Point from '../../../images/marker.png'

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

import './adminviewresort.css'

function ViewAdventure() {
    const [singleActivity, setSingleActivity] = useState({})
    const [value, setValue] = React.useState('one');

    const activity_id = useParams()

    useEffect(() => {
        getActivity();
    }, [])

    async function getActivity() {
        const response = await axios.get(`${BASE_URL}/resorts/getadventuredetail/${activity_id.id}`)
        setSingleActivity(response.data)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="admin-view-resort-main">
            <div>
                <h2>Current Adventure</h2>
                <div className="view-resort-head">
                    <div className="view-resort-first-img-contain">
                        <img className='viewresort-fst-img' src={`${BASE_URL}/${singleActivity.activity_one}`} alt="" />
                    </div>
                    <div className="head-more-details-contain">
                        <h2 className='head-heading-font'>{singleActivity.activity_name}</h2>
                        <p>{singleActivity.place}</p>
                    </div>
                </div>
            </div>
            <h2>Activity Overview</h2>
            <div style={{ display: "flex" }}>
                <div style={{ marginTop: "6px", width: "75%" }}>
                    <div className="view-resort-overview-contain">
                        <div className="overview-container">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Overview" />
                                <Tab value="two" label="Images" />
                                <Tab value="three" label="Services Offering" />
                            </Tabs>

                            {value === "one" && <div>
                                <div className="overview-main-div">
                                    <h4>Address and place</h4>
                                    <p>{singleActivity.activity_type}</p>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <p>{singleActivity.place}</p>

                                    </div>
                                    {singleActivity.is_approved ? <p className='approved'>Approved Activity</p> : <p className='pending'>Pending Activity</p>}
                                    <p>{singleActivity.location && singleActivity.location.city_name}</p>
                                    <p>{singleActivity.phone_number}</p>
                                </div>
                                <div className="overview-main-div">
                                    <h4>Description</h4>
                                    <p>{singleActivity.about}</p>
                                </div>

                            </div>}

                            {value === "two" && <div className="single-resort-img-collection">
                                <div style={{ display: "flex", gap: "1.5rem" }}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleActivity.activity_one}`} alt="" />
                                    </div>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleActivity.activity_two}`} alt="" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "1.5rem" }}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleActivity.activity_three}`} alt="" />
                                    </div>
                                    
                                </div>

                            </div>}

                            {value === "three" && <div className="single-resort-service-contain">

                                <div className="resort-room-available-view">
                                    <h2>Activity Price : {singleActivity.price}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Time Take : {singleActivity.time_take}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Slots in a day : {singleActivity.day_slot}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Safety : {singleActivity.safety}</h2>
                                </div>
                                
                            </div>}


                        </div>
                    </div>
                </div>

                <div className="owner-details-container">
                    <div className="owner-profile-img-container">
                        <img className='owner-profile-img' src={Profile} alt="" />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <h4 style={{ marginBottom: "6px" }}>Username : {singleActivity.owner && singleActivity.owner.username}</h4>
                        <p style={{ marginBottom: "6px" }}>Email : {singleActivity.owner && singleActivity.owner.email}</p>
                        <p style={{ marginBottom: "6px" }}>Phone : {singleActivity.owner && singleActivity.owner.phone_number}</p>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginBottom: "6px" }}>Staff Status : </p> {singleActivity.owner && singleActivity.owner.is_staff ? <p className='approved'>Active</p> : <p className='pending'>Blocked</p>}
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default ViewAdventure
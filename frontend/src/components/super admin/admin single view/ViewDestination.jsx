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

function ViewDestination() {
    const [singleDestination, setSingleDestination] = useState({})
    const [value, setValue] = React.useState('one');

    const destinataion_id = useParams()

    useEffect(() => {
        getDestination();
    }, [])

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });
    const [lat, lng] = singleDestination.map_location ? singleDestination.map_location.split(',') : []

    async function getDestination() {
        const response = await axios.get(`${BASE_URL}/resorts/getdestinationdetail/${destinataion_id.id}`)
        setSingleDestination(response.data)
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
                        <img className='viewresort-fst-img' src={`${BASE_URL}/${singleDestination.image_one}`} alt="" />
                    </div>
                    <div className="head-more-details-contain">
                        <h2 className='head-heading-font'>{singleDestination.spot_name}</h2>
                        <p>{singleDestination.place}</p>
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
                                <Tab value="three" label="Main Attractions" />
                                <Tab value="four" label="Location" />
                            </Tabs>

                            {value === "one" && <div>
                                <div className="overview-main-div">
                                    <h4>Address and place</h4>
                                    {singleDestination.resort && <p>{singleDestination.resort.resort_name}</p>}
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <p>{singleDestination.place}</p>

                                    </div>
                                    {singleDestination.is_approved ? <p className='approved'>Approved Destination</p> : <p className='pending'>Pending Destination</p>}
                                    <p>{singleDestination.location && singleDestination.location.city_name}</p>
                                    <p>{singleDestination.phone_number}</p>
                                </div>
                                <div className="overview-main-div">
                                    <h4>Description</h4>
                                    <p>{singleDestination.about}</p>
                                </div>

                            </div>}

                            {value === "two" && <div className="single-resort-img-collection">
                                <div style={{ display: "flex", gap: "1.5rem" }}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleDestination.image_one}`} alt="" />
                                    </div>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleDestination.image_two}`} alt="" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "1.5rem" }}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleDestination.image_three}`} alt="" />
                                    </div>
                                    
                                </div>

                            </div>}

                            {value === "three" && <div className="single-resort-service-contain">

                                <div className="resort-room-available-view">
                                    <h2>Starting Time : {singleDestination.start_time}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Closing Time : {singleDestination.close_time}</h2>
                                </div>
                                
                                
                            </div>}

                            { value === "four" && <div className="single-resort-map-contain">
                                {singleDestination.map_location && <div>
                                    <Map
                                        style="mapbox://styles/mapbox/streets-v9"
                                        zoom={[14]}
                                        center={[lng, lat]}
                                        containerStyle={{
                                            height: '25rem',
                                            width: '100%'
                                        }}
                                    >
                                        <Marker coordinates={[lng, lat]} anchor="bottom">
                                            <img height={35} src={Point} alt="Marker" />
                                        </Marker>
                                    </Map>
                                </div>}
                            </div>}


                        </div>
                    </div>
                </div>

                <div className="owner-details-container">
                    <div className="owner-profile-img-container">
                        <img className='owner-profile-img' src={Profile} alt="" />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <h4 style={{ marginBottom: "6px" }}>Username : {singleDestination.owner && singleDestination.owner.username}</h4>
                        <p style={{ marginBottom: "6px" }}>Email : {singleDestination.owner && singleDestination.owner.email}</p>
                        <p style={{ marginBottom: "6px" }}>Phone : {singleDestination.owner && singleDestination.owner.phone_number}</p>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginBottom: "6px" }}>Staff Status : </p> {singleDestination.owner && singleDestination.owner.is_staff ? <p className='approved'>Active</p> : <p className='pending'>Blocked</p>}
                        </div>
                    </div>

                </div>
            </div>


        </div>
  )
}

export default ViewDestination
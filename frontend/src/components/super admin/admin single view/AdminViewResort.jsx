import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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

function AdminViewResort() {
    const [singleResort, setSingleResort] = useState({})
    const [value, setValue] = React.useState('one');

    useEffect(() => {

        getResort();
    }, [])

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });
    const [lat, lng] = singleResort.map_location ? singleResort.map_location.split(',') : []


    const resort_id = useParams()

    async function getResort() {
        const response = await axios.get(`${BASE_URL}/resorts/singleresortpage/${resort_id.id}`)
        setSingleResort(response.data)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <div className="admin-view-resort-main">
            <div>
                <h2>Current Resort</h2>
                <div className="view-resort-head">
                    <div className="view-resort-first-img-contain">
                        <img className='viewresort-fst-img' src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                    </div>
                    <div className="head-more-details-contain">
                        <h2 className='head-heading-font'>{singleResort.resort_name}</h2>
                        <p>{singleResort.address}</p>
                    </div>
                </div>
            </div>
            <h2>Resort Overview</h2>
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
                                <Tab value="four" label="Location" />
                            </Tabs>

                            {value === "one" && <div>
                                <div  className="overview-main-div">
                                    <h4>Address and place</h4>
                                    <p>{singleResort.address}</p>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <p>{singleResort.place}</p>
                                        <p>{singleResort.zipcode}</p>
                                    </div>

                                    <p>{singleResort.location && singleResort.location.city_name}</p>
                                    <p>{singleResort.phone_number}</p>
                                </div>
                                <div className="overview-main-div">
                                    <h4>Description</h4>
                                    <p>{singleResort.description}</p>
                                </div>

                            </div>}

                            { value === "two" && <div className="single-resort-img-collection">
                                <div style={{display:"flex", gap:"1.5rem"}}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                                    </div>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleResort.image_two}`} alt="" />
                                    </div>
                                </div>
                                <div style={{display:"flex", gap:"1.5rem"}}>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleResort.image_three}`} alt="" />
                                    </div>
                                    <div className="resort-single-img-contain">
                                        <img className='each-img-resort-view' src={`${BASE_URL}/${singleResort.image_four}`} alt="" />
                                    </div>
                                </div>

                            </div>}

                            { value === "three" && <div className="single-resort-service-contain">

                                <div className="resort-room-available-view">
                                    <h2>Room Availability : {singleResort.rooms_available}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Room Type : {singleResort.room_type}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Room Price/Day : {singleResort.price}</h2>
                                </div>
                                <div className="resort-room-available-view">
                                    <h2>Swimming Pool : </h2> <h2>{singleResort.pool_available ? <p>Have Pool</p> : <p> Dont Have Pool</p>}</h2>
                                    
                                </div>
                                <div className="resort-room-available-view">
                                <h2>Wifi/Internet : </h2> <h2>{singleResort.wifi_available ? <p>Have Wifi</p> : <p> Dont Have Wifi</p>}</h2>
                                    
                                </div>
                            </div>}
                            
                            { value === "four" && <div className="single-resort-map-contain">
                                {singleResort.map_location && <div>
                                    <Map
                                        style={"mapbox://styles/mapbox/streets-v9"}
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
                        <h4 style={{ marginBottom: "6px" }}>Username : {singleResort.owner && singleResort.owner.username}</h4>
                        <p style={{ marginBottom: "6px" }}>Email : {singleResort.owner && singleResort.owner.email}</p>
                        <p style={{ marginBottom: "6px" }}>Phone : {singleResort.owner && singleResort.owner.phone_number}</p>
                        <div style={{display:"flex"}}>
                            <p style={{ marginBottom: "6px" }}>Staff Status : </p> {singleResort.owner && singleResort.owner.is_staff ? <p className='approved'>Active</p> : <p className='pending'>Blocked</p> }
                        </div>
                    </div>

                </div>
            </div>


        </div>

    )
}

export default AdminViewResort
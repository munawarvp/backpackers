import React, { useEffect, useState } from 'react'
import service1 from "../../../images/service1.png";
import service2 from "../../../images/service2.png";
import service3 from "../../../images/service3.png";
import service4 from "../../../images/service4.png";

import info1 from "../../../images/info1.png";
import info2 from "../../../images/info2.png";
import info3 from "../../../images/info3.png";

import './services.css'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';

function Services() {
    const [resortList, setResortList] = useState([])
    const [adventureList, setAdventureList] = useState([])
    const [destinationList, setDestinationList] = useState([])

    useEffect(()=>{
        getResorts();
        getAdventures();
        getDestinations();
    }, [])

    async function getResorts() {
        const respone = await axios.get(`${BASE_URL}/resorts/homelistresort`)
        setResortList(respone.data)
    }
    async function getAdventures() {
        const respone = await axios.get(`${BASE_URL}/resorts/homelistadventure`)
        setAdventureList(respone.data)
    }
    async function getDestinations() {
        const respone = await axios.get(`${BASE_URL}/resorts/homelistdestination`)
        setDestinationList(respone.data)
    }
    const data = [
        {
            icon: service1,
            title: "Get Best Prices",
            subTitle:
                "Pay through our application and save thousands and get amazing rewards.",
        },
        {
            icon: service2,
            title: "Covid Safe",
            subTitle:
                "We have all the curated hotels that have all the precaution for a covid safe environment.",
        },
        {
            icon: service3,
            title: "Flexible Payment",
            subTitle:
                " Enjoy the flexible payment through our app and get rewards on every payment.",
        },
        {
            icon: service4,
            title: "Find The Best Near You",
            subTitle:
                "Find the best hotels and places to visit near you in a single click.",
        },
    ];


    return (
        <>
            <div id='services'>
                {data.map((service, index) => {
                    return (
                        <div className="service">
                            <div className="icon">
                                <img src={service.icon} alt="" />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.subTitle}</p>
                        </div>
                    );
                })}
            </div>

            <div id="recommend">
                <div className="title">
                    <h2>Recommended Resorts</h2>
                </div>
                {/* <div className="packages">
                    <ul>
                        {packages.map((pkg, index) => {
                            return (
                                <li
                                    className={active === index + 1 ? "activer" : ""}
                                    onClick={() => setActive(index + 1)}
                                >
                                    {pkg}
                                </li>
                            );
                        })}
                    </ul>
                </div> */}
                <div className="destinations">
                    {resortList.map((destination) => {
                        return (
                            <Link to={`/resort-details/${destination.id}`}>
                            <div className="destination">
                                <div className="resort-img-container">
                                    <img className='home-resort-img' src={`${BASE_URL}/${destination.image_one}`} alt="" />
                                </div>
                                
                                <h3>{destination.resort_name}</h3>
                                <p>{destination.address}</p>
                                <div className="info">
                                    <div className="services-recom">
                                        <img src={info1} alt="" />
                                        <img src={info2} alt="" />
                                        <img src={info3} alt="" />
                                    </div>
                                    <h4>{destination.price} ₹</h4>
                                </div>
                                <div className="distance">
                                    <span>reviews</span>
                                    <span>{destination.duration}</span>
                                </div>
                            </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div id="recommend">
                <div className="title">
                    <h2>Recommended Activities</h2>
                </div>
                <div className="destinations">
                    {adventureList.map((destination) => {
                        return (
                            <Link to={`/adventure-details/${destination.id}`}>
                            <div className="destination">
                                <div className="resort-img-container">
                                    <img className='home-resort-img' src={`${BASE_URL}/${destination.activity_one}`} alt="" />
                                </div>
                                
                                <h3>{destination.activity_name}</h3>
                                <p>{destination.about}</p>
                                <div className="info">
                                    <div className="services-recom">
                                        <img src={info1} alt="" />
                                        <img src={info2} alt="" />
                                        <img src={info3} alt="" />
                                    </div>
                                    <h4>Time : {destination.time_take} Minutes</h4>
                                </div>
                                <div className="distance">
                                    <span>reviews</span>
                                    
                                </div>
                            </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div id="recommend">
                <div className="title">
                    <h2>Poppular Destinations</h2>
                </div>
                <div className="destinations">
                    {destinationList.map((destination) => {
                        return (
                            <div className="destination">
                                <div className="resort-img-container">
                                    <img className='home-resort-img' src={`${BASE_URL}/${destination.image_one}`} alt="" />
                                </div>
                                
                                <h3>{destination.spot_name}</h3>
                                <p>{destination.about}</p>
                                <div className="info">
                                    <div className="services-recom">
                                        <img src={info1} alt="" />
                                        <img src={info2} alt="" />
                                        <img src={info3} alt="" />
                                    </div>
                                    <h4>{destination.place}</h4>
                                </div>
                                <div className="distance">
                                    <span>reviews</span>
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </>

    )
}

export default Services
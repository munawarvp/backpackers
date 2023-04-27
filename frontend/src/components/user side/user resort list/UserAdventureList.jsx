import React, { useState, useEffect } from 'react'
import './userresortlist.css'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

function UserAdventureList() {
    const [locationList, setLocationlist] = useState([]);
    const [adventureList, setAdventureList] = useState([])

    useEffect(() => {
        locations();
        adventures();
    }, [])
    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }
    async function adventures() {
        const response = await axios.get(`${BASE_URL}/resorts/userlistadventures`)
        setAdventureList(response.data)
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
                    <h3>Total number of adventures : 20</h3>
                </div>
            </div>


            <div className="filter-sort-resort">
                <div className='sort-resort-item'>
                    <h4>SORT BY</h4>
                </div>
                <div className='sort-resort-item'>
                    <h4>FILTER BY</h4>
                </div>
                <div className='sort-resort-item'>
                    <h4>PRICE</h4>
                </div>
            </div>

            {adventureList.map((adventure) => (
                <Link className='link' to={`/adventure-details/${adventure.id}`}>
                    <div className="resort-listing">
                        <div className="single-resort-card">
                            <div className="resort-card-image">
                                <img src={`${BASE_URL}/${adventure.activity_one}`} alt="" />
                            </div>
                            <div className="resort-card-details">
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <p className="rating-count">3.8 </p>
                                        <AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='yellow' /><AiFillStar color='black' /><AiFillStar color='black' />
                                    </div>
                                    <div className='resort-address'>
                                        <h3>{adventure.activity_name}</h3>
                                        <p className='resort-card-address'>{adventure.place}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='resort-card-cancel'>Free cancelation till checkin</p>
                                    <p className='resort-card-review'>reviews(10)</p>
                                </div>
                            </div>
                            <div className="resort-card-price">
                                <div>
                                    <p className='card-price-amount'>{adventure.price} ₹</p>
                                    <p className="card-price-cut"> <s>2000 ₹</s></p>
                                </div>
                                <button className='resort-card-btn'>View Activity</button>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    )
}

export default UserAdventureList
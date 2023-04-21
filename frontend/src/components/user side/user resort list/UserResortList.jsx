import React, { useState, useEffect } from 'react'
import './userresortlist.css'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

function UserResortList() {
    const [locationList, setLocationlist] = useState([]);

    useEffect(() => {
        locations();
    }, [])
    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }
    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })
    const options = [
        { value: 'chocolate', label: 'Choc' },

    ]
    return (
        <div className="user-resortlist-main">
            <div className="resort-search-filter">
                <div style={{ display: "flex", gap: "2rem", alignItems:"center"}}>
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


            <div className="filter-sort-resort">
                <div>
                    <h4>SORT BY</h4>
                </div>
                <div>
                    <h4>SORT BY</h4>
                </div>
                <div>
                    <h4>SORT BY</h4>
                </div>
            </div>

            <div className="resort-listing">
                <div className="single-resort-card">
                    <h1>Resort name</h1>
                </div>
                <div className="single-resort-card">
                    <h1>Resort name</h1>
                </div>
            </div>
        </div>
    )
}

export default UserResortList
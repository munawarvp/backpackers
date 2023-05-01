import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { DatePicker, Button } from 'antd';
import { AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { useNavigate } from 'react-router-dom';

function UserDestinationList() {
    const [locationList, setLocationlist] = useState([]);
    const [destinationList, setDestinationList] = useState([]);

    const history = useNavigate()

    useEffect(() => {
        locations();
        destinations();
    }, [])

    async function locations() {
        const response = await axios.get(`${BASE_URL}/resorts/locations/`)
        setLocationlist(response.data)
    }
    async function destinations() {
        const response = await axios.get(`${BASE_URL}/resorts/userlistdestinations/`)
        setDestinationList(response.data)
    }

    const loctions = locationList.map((item) => {
        return ({
            value: item.id, label: item.city_name
        })
    })
    const goSingleDestination = (id)=> {
        history(`/destination-details/${id}`)
    }
    return (
        <div className="user-resortlist-main">
            <div className="resort-search-filter">
                <div style={{ display: "flex", gap: "2rem", alignItems: "end" }}>
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

            <div>
                <div className="destination-listing">
                    {destinationList.map((destination) => (
                        <div className="single-desti-card" onClick={()=>goSingleDestination(destination.id)}>
                            <img className='destination-card-img' src={`${BASE_URL}/${destination.image_one}`} alt="" />
                            <div className="destination-details">
                                <h3>{destination.spot_name}</h3>
                                <p className='destination-place'>{destination.place}</p>
                                <p className='destination-descri'>{destination.about}</p>
                            </div>
                        </div>
                    ))}
                    {/* <div className="single-desti-card">
                        <img className='destination-card-img' src={Destination} alt="" />
                        <div className="destination-details">
                            <h3>destination.spot_name</h3>
                            <p className='destination-place'>destination.place</p>
                            <p className='destination-descri'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iusto voluptatibus fuga, odit autem debitis a</p>
                        </div>
                    </div><div className="single-desti-card">
                        <img className='destination-card-img' src={Destination} alt="" />
                        <div className="destination-details">
                            <h3>destination.spot_name</h3>
                            <p className='destination-place'>destination.place</p>
                            <p className='destination-descri'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iusto voluptatibus fuga, odit autem debitis a</p>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    )
}

export default UserDestinationList
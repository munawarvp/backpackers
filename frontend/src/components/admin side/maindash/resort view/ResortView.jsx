import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../utils/config';
import { AiTwotoneHome } from 'react-icons/ai'
import { HiCurrencyRupee } from 'react-icons/hi'

import './resortview.css'

function ResortView() {
    const [singleResort, setSingleResort] = useState({})

    const resort_id = useParams()

    useEffect(() => {
        getResort();
    }, [])

    async function getResort() {
        const response = await axios.get(`${BASE_URL}/resorts/createresorts/${resort_id.id}`)
        setSingleResort(response.data)
    }

    return (
        <div className="MainDash">
            <h1>Your Resort</h1>

            <div className="view-resort-main-container">
                <div className="view-resort-first-section">
                    <div className="first-section-left">
                        <div className="left-view-img-container">
                            <img className='left-view-img' src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                        </div>
                    </div>
                    <div className="first-section-right-side">
                        <p className='view-right-side-name'>{singleResort.resort_name}</p>
                        <p>{singleResort.address}</p>
                        <p className='view-right-side-place'>{singleResort.place}</p>
                        <p className='view-right-side-name'>Owner : {singleResort.owner && singleResort.owner.username}</p>
                    </div>
                </div>
                <div className="view-resort-second-section">
                    <div className="second-section-heading">
                        <p>Image collection of your resort :</p>
                    </div>

                    <div className="second-section-img-container">
                        <div className="second-image-only-container">
                            <div className="view-resort-single-imgcontainer">
                                <img src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                            </div>
                            <div className="view-resort-single-imgcontainer">
                                <img src={`${BASE_URL}/${singleResort.image_two}`} alt="" />
                            </div>
                            <div className="view-resort-single-imgcontainer">
                                <img src={`${BASE_URL}/${singleResort.image_three}`} alt="" />
                            </div>
                            <div className="view-resort-single-imgcontainer">
                                <img src={`${BASE_URL}/${singleResort.image_four}`} alt="" />
                            </div>
                        </div>

                        <div className="view-resort-desc-container">
                            <div className="second-section-heading">
                                <p style={{ marginBottom: "5px" }}>Description of your resort :</p>
                                <p>{singleResort.description}</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="view-resort-third-section">
                    <div className="second-section-heading">
                        <p>Details of your resort :</p>
                    </div>

                    <div className="second-section-content">
                        <div className="view-second-half">
                            <p>Full Address :{singleResort.address}</p>
                            <p>Owner :{singleResort.owner && singleResort.owner.username}</p>
                            <p>Owner Email :{singleResort.owner && singleResort.owner.email}</p>
                            <p>Contact Number :{singleResort.phone_number}</p>
                            <p>Type of room :{singleResort.room_type}</p>
                        </div>
                        <div className="view-second-half">
                            {singleResort.is_approved ? <p className='approved'>Status : Approved</p> : <p className='pending'>Status : Pending</p>}
                            <div style={{display:"flex", gap:"15px"}}>
                                <div className="view-number-room">
                                    <div>
                                        <p>Rooms available </p>
                                        <p className='number-of-room'>{singleResort.rooms_available}</p>
                                    </div>
                                    <div className='view-number-icon-container'>
                                        <AiTwotoneHome size={50} color='#25d5f2' />
                                    </div>

                                </div>
                                <div className="view-number-room">
                                    <div>
                                        <p>Price per day </p>
                                        <p className='number-of-room'>{singleResort.price}</p>
                                    </div>
                                    {/* <div className='view-number-icon-container'> */}
                                        <HiCurrencyRupee size={60} color='red' />
                                    {/* </div> */}

                                </div>
                            </div>

                            <p>Price per day :{singleResort.price}</p>
                            <p>This resort added on :{singleResort.created_date}</p>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default ResortView
import React, { useEffect, useState } from 'react'
import './pendingresorts.css'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { IoMdCloseCircle } from 'react-icons/io'
import { AiOutlineWifi } from 'react-icons/ai'
import { FiWifiOff } from 'react-icons/fi'
import { FaSwimmer } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import { toast, Toaster } from 'react-hot-toast'


function PendingResorts() {
    const [pendingResort, setPendingResort] = useState([])
    const [singleResort, setSingleResort] = useState({})
    const [locationDetails, setLocation] = useState({})
    const [toggle, setToggle] = useState(false)

    useEffect(()=>{
        pending();
    },[])

    async function pending() {
        const response = await axios.get(`${BASE_URL}/resorts/listpending`)
            setPendingResort(response.data)
    }

    const handleClick = (id) => {
        const singleResort = async () => {
            const response = await axios.get(`${BASE_URL}/resorts/singleresort/${id}`)
            setSingleResort(response.data)
            setLocation(response.data.location)
            // setOwnerDetails(response.data.owner)
        }
        singleResort();
        setToggle(!toggle)
    }

    async function handleApproval(user_id, id){
        console.log(user_id);
        const response = await axios.get(`${BASE_URL}/resorts/approveresort/${user_id.id}/${id}`).then(()=>console.log(response))
        // .then(()=>{if(response.status === 200){
        //     toast.success('Approved')
        // }})
        // .catch(toast.error('Something went wrong'))
        setToggle(!toString)
        pending()
        
    }

    async function handleRejection(id) {
        const response = await axios.delete(`${BASE_URL}/resorts/rejectresort/${id}`)
        pending();
        toast.success('Resort rejected')
        setToggle(!toggle)
    }
    
  return (
    <div className='table-div'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="pending-resort-header">
            <h1>Pending Requests</h1>
        </div>
        <div className="pending-cards">
            {pendingResort.map((item)=>(<>
                <div className="resort-card" onClick={()=>handleClick(item.id)}>
                    <div>
                        <img style={{height:"100px"}} src={`${BASE_URL}/${item.image_one}`} alt="" />
                    </div>
                    <div>
                        <p><b>Resort : </b>{item.resort_name}</p>
                        <p><b>Owner : </b>{item.owner.username}</p>
                        <p><b>Number of Rooms : </b>{item.rooms_available}</p>
                    </div>
                    <div>
                        <p><b>Phone Number : </b>{item.phone_number}</p>
                        <p><b>Room Type : </b>{item.room_type}</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"end", alignItems:"center"}}>
                        <AiFillEye size={30}/>
                        <p>View</p>
                    </div>
                    
                </div>
                {toggle ? <div className="pop-up-pending">
                                
                                <div className="pending-reso-details">
                                    <div className='resort-name-toggle'>
                                        <h2>Resort Name : {singleResort.resort_name}</h2>
                                        <IoMdCloseCircle size={30} onClick={()=>setToggle(!toggle)}/>
                                    </div>
                                    <div style={{display:"flex", gap:"3rem"}}>
                                        <h3>Owner : {singleResort.owner && singleResort.owner.username}</h3>
                                        <h3>Email : {singleResort.owner && singleResort.owner.email}</h3>
                                    </div>
                                    
                                    <p><b>Phone : </b>{singleResort.phone_number}</p>
                                    <div className="resort-images">
                                        <h4>Resort Images :</h4>
                                        <img src={`${BASE_URL}/${singleResort.image_one}`} alt="" />
                                        <img src={`${BASE_URL}/${singleResort.image_two}`} alt="" />
                                        {item.image_three ? <img src={`${BASE_URL}/${singleResort.image_three}`} alt="" /> : null}
                                        {item.image_four ? <img src={`${BASE_URL}/${singleResort.image_four}`} alt="" /> : null}
                                    </div>
                                    <p><b>Description: </b> <br/>{singleResort.description}</p>
                                    <div style={{display:"flex", gap:"3rem"}}>
                                        <p><b>Location: </b>{locationDetails.city_name}</p>
                                        <p><b>Place: </b>{singleResort.place}</p>
                                    </div>
                                    <p><b>Address: </b> <br/>{singleResort.address}, {singleResort.zipcode}</p>
                                    <div style={{display:"flex", gap:"3rem"}}>
                                        <p><b>Room Type: </b>{singleResort.room_type}</p>
                                        <p><b>Number of Accommodation: </b>{singleResort.rooms_available}</p>
                                        <p><b>Booking Price/Day: {singleResort.price}</b></p>
                                    </div>
                                    <div style={{display:"flex", gap:"3rem"}}>
                                        <p><b>Services Available:</b></p>
                                        {singleResort.wifi_available ? <AiOutlineWifi size={45}/> : <FiWifiOff size={45} />}                                        
                                        {singleResort.pool_available ? <FaSwimmer size={45}/> : null}
                                    </div>
                                    <p><b>Approval Status: </b>{singleResort.is_approval ? "Approved" : "Pending"}</p>

                                    <div style={{display:"flex", gap:"3rem", justifyContent:"center"}}>
                                        <button style={{backgroundColor:"green"}} className='resort-popup-btn' onClick={()=>handleApproval(singleResort.owner, singleResort.id)}>Accept</button>
                                        <button style={{backgroundColor:"red"}} className='resort-popup-btn' onClick={()=>handleRejection(singleResort.id)}>Reject</button>
                                    </div>
                                    
                                </div>
                              </div> : null}
                </>
            ))}
            
        </div>
        
    </div>
  )
}

export default PendingResorts
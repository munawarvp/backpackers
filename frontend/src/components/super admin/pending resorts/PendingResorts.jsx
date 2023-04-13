import React, { useEffect, useState } from 'react'
import './pendingresorts.css'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { IoMdCloseCircle } from 'react-icons/io'

function PendingResorts() {
    const [pendingResort, setPendingResort] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(()=>{
        const pending = async ()=> {
            const response = await axios.get(`${BASE_URL}/resorts/listpending`)
            setPendingResort(response.data)
        }
        pending();
    },[])
    console.log(pendingResort);
  return (
    <div className='table-div'>
        <div className="pending-resort-header">
            <h1>Pending Requests</h1>
        </div>
        <div className="pending-cards">
            {pendingResort.map((item)=>(<>
                <div className="resort-card" onClick={()=>setToggle(!toggle)}>
                    <h3>{item.resort_name}</h3>
                    <h4>{item.phone_number}</h4>
                    <p>Descriptions Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fuga iusto maxime, cum, architecto animi, unde rem atque quae fugiat officiis sit ab! Unde ratione eaque ea consectetur quam minus!</p>
                </div>
                {toggle ? <div className="pop-up-pending">
                                
                                <div className="pending-reso-details">
                                    <div className='resort-name-toggle'>
                                        <h1>{item.resort_name}</h1>
                                        <IoMdCloseCircle size={30} onClick={()=>setToggle(!toggle)}/>
                                    </div>
                                    {console.log(item.image_one)}
                                    <p>Phone : {item.phone_number}</p>
                                    <img src={`${BASE_URL}/${item.image_one}`} alt="Image" />
                                    <img src={`${BASE_URL}/${item.image_two}`} alt="Image" />
                                    {item.image_three ? <img src={`${BASE_URL}/${item.image_three}`} alt="Image" /> : null}
                                    {item.image_three ? <img src={`${BASE_URL}/${item.image_three}`} alt="Image" /> : null}
                                </div>
                              </div> : null}
                </>
            ))}
            
        </div>
        
    </div>
  )
}

export default PendingResorts
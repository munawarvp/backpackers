import React from 'react'
import './updates.css'
import { UpdateDate } from '../../data/Data'

function Updates() {
  return (
    <div className="Updates">
        {UpdateDate.map((item)=>{
            return(
                <div className="update">
                    <img src={item.img} alt="" />
                    <div className="noti">
                        <div style={{marginBottom:'0.5rem'}}>
                            <span>{item.name}</span>
                            <span> {item.notification}</span>
                        </div>
                        <span>{item.time}</span>
                    </div>
                    
                    
                </div>
            )
        })}
    </div>
  )
}

export default Updates
import React from 'react'
import './registerwithus.css'
import Done from '../../../images/Checklist.jpg'
import { useNavigate } from 'react-router-dom'

function RegisterSuccess() {
    const history = useNavigate()
  return (
    <div className='regi-succ-bg'>
        <div className="success-main-container">
            <div className='regi-heading-div'>
                <h2 className='regi-heading'>Your resort registered successfully..!</h2>
                <p className='regi-heading'>We will get back to through email</p>
            </div>
            <div className="regi-img">
                <img className='done-img' src={Done} alt="" />
            </div>
            <div className='regi-btn-div'>
                <button className='regi-btn' onClick={()=>history('/')}>Home Page</button>
            </div>
            
        </div>
    </div>
  )
}

export default RegisterSuccess
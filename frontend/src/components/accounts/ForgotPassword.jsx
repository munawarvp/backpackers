import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './accounts.css'
import { toast, Toaster } from 'react-hot-toast'

import Background from '../../images/travelling.jpg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/api/forgotpassword/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email
      })
    })

    const data = await response.json();
    localStorage.setItem('user_id', data.user_id)
    // console.log(data.user_id);

    // console.log('forgot response', mypromise);
    if (response.status === 200) {
      toast.success("Password Reset Link Send")
      localStorage.setItem('email',email)
    } else if (response.status === 500) {
      toast.error("No Account Found")
    }

  }
  return (
    <div>
      <div className='main-div'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="login-background-contain">
          <img src={Background} alt="" />
        </div>
        <div className='forgot-travel-image'>
          <h1 className='login-text'>Forgot Password</h1>
          <p>Please Enter Your Registered Email</p>
          <form className='login-input' onSubmit={handleSubmit} >
            <div className="login-input-contain">
              <input className='input-field' type="email" name='username' placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input className='login-btn' type="submit" value='VERIFY' />

            <div className='signup-navi'>
              <p>Alredy a member..?</p>
              <p><Link className='lo-sign' to='/login'>Login</Link></p>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
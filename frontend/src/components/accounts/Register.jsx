import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './accounts.css'
import { toast, Toaster } from 'react-hot-toast'
import { BASE_URL } from '../../utils/config'

function Register() {
  const [first_name, setFirstname] = useState('')
  const [last_name, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const history = useNavigate()

  const signupSubmit = async (e) => {
    e.preventDefault()

    if (password === password2) {
      const response = await fetch(`${BASE_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          username: email.split('@')[0],
          phone_number,
          password,
        })
      })
      // console.log(response);
      if(response.status === 200){
        toast.success("Account Created, Please Activate..!")
      }else{
        toast.error("Something went wrong")
      }
    }
    else{
      toast.error("Password did't match")
    }

  }

  return (
    <div className='main-div-signup'>
      <Toaster position='top-center' reverseOrder='false' ></Toaster>
      <div className='login-content'>
        <h1 className='login-text'>SignUp</h1>
        <p>Please Enter Your SignUp Details</p>
        <form className='login-input' onSubmit={signupSubmit} >
          <input className='input-field' type="text" name='firstname' placeholder='firstname'
            onChange={e => setFirstname(e.target.value)}
          />
          <input className='input-field' type="text" name='lastname' placeholder='lastname'
            onChange={e => setLastname(e.target.value)}
          />
          <input className='input-field' type="email" name='email' placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <input className='input-field' type="text" name='phone_number' placeholder='phone'
            onChange={e => setPhone(e.target.value)}
          />
          <input className='input-field' type="password" name='password' placeholder='password'
            onChange={e => setPassword(e.target.value)}
          />
          <input className='input-field' type="password" name='password2' placeholder='confirm password'
            onChange={e => setPassword2(e.target.value)}
          />
          <input className='login-btn' type="submit" value='SIGNUP' />
          <div className='signup-navi'>
            <p>Alredy a member..?</p>
            <p><Link className='lo-sign' to='/login'>Login</Link></p>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register
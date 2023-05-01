import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login, { getLocal } from '../../helpers/auth'
import './accounts.css'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { toast, Toaster } from 'react-hot-toast'
import Travel from '../../images/travel-login.png'
import Background from '../accounts/images/trylogin.jpg'

function Login() {
    // const {count} = useSelector((state)=>state.auth)
    // const dispatch = useDispatch()
    const response = getLocal()
    const history = useNavigate()

    useEffect(() => {
        if (response) {
            history('/')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login_response = await login(e);
        console.log(login_response, 'log response');
        // history('/') 
        // let data = login_response.json()
        // console.log('data in login page',data);
        const local_response = getLocal('authToken');
        // console.log(local_response, 'from local storage');
        if (local_response) {
            const location = localStorage.getItem('location')
            const decoded = jwt_decode(local_response)
            console.log(decoded, 'decoded in login page');
            if (decoded.is_admin) {
                history('/admin-dashboard')
            } else if (decoded.is_staff) {
                console.log('staff');
                history('/admin-dashboard')
            } else if (location) {
                history(location, { replace: true })
                localStorage.removeItem('location')
            } else {
                history('/', { replace: true })
            }
        } else {
            toast.error('Invalid User Credentials')
        }
    }

    return (
        <div className='main-div'>
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div className="login-background-contain">
                <img src={Background} alt="" />
            </div>
            <div className='login-travel-image'>
                <img src={Travel} alt="" className="travel-login" />
                <div className='login-content'>
                    <h1 className='login-text'>Login</h1>
                    <p>Please Enter Your Login Details</p>
                    <form className='login-input' onSubmit={handleSubmit} >
                        <div className="login-input-contain">
                            <input className='input-field' type="email" name='username' placeholder='email' />
                        </div>
                        <div className="login-input-contain">
                            <input className='input-field rmv-mb' type="password" name='password' placeholder='password' />
                            <p><Link className='lo-sign' to='/forgot-password'>Forgot Password..?</Link></p>
                        </div>
                        
                        <input className='login-btn-login' type="submit" value='LOGIN' />

                        <div className='signup-navi'>
                            <p>Not yet registered..?</p>
                            <p><Link className='lo-sign' to='/register'>SignUp</Link></p>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Login
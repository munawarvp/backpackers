import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillInstagram } from 'react-icons/ai'
import { BsLinkedin, BsFacebook } from 'react-icons/bs'
import './footer.css'

function Footer() {
    return (
        <div className='main-footer-container'>
            <div>
                <span>Copyright &copy; 2023 backpackers. All rights reserved</span>
               <Link to={'/register-with-us'}><h4 className='register-with-us'>Register with us..?</h4></Link>
            </div>

            <ul className='ul-links'>
                <li>
                    <Link className='footer-ul-links' to={'/'}>Home</Link>
                </li>
                <li>
                    <Link className='footer-ul-links' to={'/'}>Resorts</Link>
                </li>
                <li>
                    <Link className='footer-ul-links' to={'/'}>Adventures</Link>
                </li>
                <li>
                    <Link className='footer-ul-links' to={'/'}>Destinations</Link>
                </li>
                <li>
                    <Link className='footer-ul-links' to={'/'}>Faqs</Link>
                </li>
            </ul>
            <ul className="ul-links">
                <li>
                    <BsFacebook />
                </li>
                <li>
                    <BsLinkedin />
                </li>
                <li>
                    <AiFillInstagram />
                </li>
            </ul>
        </div>
    )
}

export default Footer
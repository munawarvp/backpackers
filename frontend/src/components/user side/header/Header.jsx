import React from 'react'
import headerImage from '../../../images/hero.png'
import './header.css'

function Header() {
    return (
        <div className="section">
            <div id="hero">
                <div className="background">
                    <img src={headerImage} alt="" />
                </div>
                <div className="content">
                    <div className="title">
                        <h1>HOLIDAYS TO BE REMEBERED</h1>
                        <p>
                            Make your vacation plans with us. You will enjoy the places and resorts we are providing.
                            There is many more to explore and experience in various regions.
                        </p>
                    </div>
                    <div className="search">
                        <div className="container">
                            <label htmlFor="">Where you want to go</label>
                            <input type="text" placeholder="Search Your location" />
                        </div>
                        <div className="container">
                            <label htmlFor="">Check-in</label>
                            <input type="date" />
                        </div>
                        <div className="container">
                            <label htmlFor="">Check-out</label>
                            <input type="date" />
                        </div>
                        <button>Explore Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
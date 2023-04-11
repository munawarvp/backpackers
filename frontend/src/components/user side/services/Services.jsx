import React, { useState } from 'react'
import service1 from "../../../images/service1.png";
import service2 from "../../../images/service2.png";
import service3 from "../../../images/service3.png";
import service4 from "../../../images/service4.png";

import Destination2 from "../../../images/Destination2.png";
import Destination3 from "../../../images/Destination3.png";
import Destination4 from "../../../images/Destination4.png";
import Destination5 from "../../../images/Destination5.png";
import Destination6 from "../../../images/Destination6.png";
import Destination1 from "../../../images/Destination1.png";

import info1 from "../../../images/info1.png";
import info2 from "../../../images/info2.png";
import info3 from "../../../images/info3.png";

import './services.css'

function Services() {
    const data = [
        {
            icon: service1,
            title: "Get Best Prices",
            subTitle:
                "Pay through our application and save thousands and get amazing rewards.",
        },
        {
            icon: service2,
            title: "Covid Safe",
            subTitle:
                "We have all the curated hotels that have all the precaution for a covid safe environment.",
        },
        {
            icon: service3,
            title: "Flexible Payment",
            subTitle:
                " Enjoy the flexible payment through our app and get rewards on every payment.",
        },
        {
            icon: service4,
            title: "Find The Best Near You",
            subTitle:
                "Find the best hotels and places to visit near you in a single click.",
        },
    ];
    const datatwo = [
        {
            image: Destination1,
            title: "Singapore",
            subTitle: "Singapore, officialy thr Republic of Singapore, is a",
            cost: "38,800",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination2,
            title: "Thailand",
            subTitle: "Thailand is a Southeast Asia country. It's known for",
            cost: "54,200",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination3,
            title: "Paris",
            subTitle: "Paris, France's capital, is a major European city and a",
            cost: "45,500",
            duration: "Approx 2 night trip",
        },
        {
            image: Destination4,
            title: "New Zealand",
            subTitle: "New Zealand is an island country in the",
            cost: "24,100",
            duration: "Approx 1 night trip",
        },
        {
            image: Destination5,
            title: "Bora Bora",
            subTitle: "Bora Bora is a small South Pacific island northwest of",
            cost: "95,400",
            duration: "Approx 2 night 2 day trip",
        },
        {
            image: Destination6,
            title: "London",
            subTitle: "London, the capital of England and the United",
            cost: "38,800",
            duration: "Approx 3 night 2 day trip",
        },
    ];

    const packages = [
        "The Weekend Break",
        "The Package Holiday",
        "The Group Tour",
        "Long Term Slow Travel",
    ];


    const [active, setActive] = useState(1);
    return (
        <>
            <div id='services'>
                {data.map((service, index) => {
                    return (
                        <div className="service">
                            <div className="icon">
                                <img src={service.icon} alt="" />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.subTitle}</p>
                        </div>
                    );
                })}
            </div>

            <div id="recommend">
                <div className="title">
                    <h2>Recommended Destinations</h2>
                </div>
                <div className="packages">
                    <ul>
                        {packages.map((pkg, index) => {
                            return (
                                <li
                                    className={active === index + 1 ? "activer" : ""}
                                    onClick={() => setActive(index + 1)}
                                >
                                    {pkg}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="destinations">
                    {datatwo.map((destination) => {
                        return (
                            <div className="destination">
                                <img src={destination.image} alt="" />
                                <h3>{destination.title}</h3>
                                <p>{destination.subTitle}</p>
                                <div className="info">
                                    <div className="services-recom">
                                        <img src={info1} alt="" />
                                        <img src={info2} alt="" />
                                        <img src={info3} alt="" />
                                    </div>
                                    <h4>{destination.cost}</h4>
                                </div>
                                <div className="distance">
                                    <span>1000 Kms</span>
                                    <span>{destination.duration}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>

    )
}

export default Services
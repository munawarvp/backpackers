import { UilEstate, UilNewspaper, UilBookOpen, UilShield, UilMapPin, UilPicture  } from "@iconscout/react-unicons"
import img1 from '../../../images/img1.png'
import img2 from '../../../images/img2.png'
import img3 from '../../../images/img3.png'


export const SidebarData = [
    {
        icon: UilNewspaper,
        heading: "Dashboard",
        link: "/admin-dashboard"
    },
    {
        icon: UilEstate,
        heading: "Resorts",
        link: '/staff/resorts'

    },
    {
        icon: UilPicture,
        heading: "Adventures",
        link: "/staff/adventure"
    },
    {
        icon: UilMapPin,
        heading: "Destinations",
        link: "/staff/destination",
    },
    {
        icon: UilBookOpen,
        heading: "Bookings",
        link: "/staff/bookings"
    },
    {
        icon: UilShield,
        heading: "Services",
        link: "/staff/services"
    },
    
];

export const CardsData = [
    {
        title: 'Resort Booking',
        color: {
            // backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            backGround: '#1a8cff',
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 85,
        value: "210",
    },
    {
        title: 'Adventure Booking',
        color: {
            // backGround: "linear-gradient(180deg, #FF919D 50%, #FC929D 100%)",
            backGround: '#eb6464',
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 60,
        value: "60",
    },
    {
        title: 'Total Revenue',
        color: {
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            // backGround: '#ffbb4f',
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 50,
        value: "20000$",
    },
]

export const UpdateDate = [
    {
        img : img1,
        name : "Munawar",
        notification: "has booked this Room for 2 days",
        time : "15 minutes ago"
    },
    {
        img : img2,
        name : "Ajith",
        notification: "has booked this Room for 1 days",
        time : "10 minutes ago"
    },
    {
        img : img3,
        name : "Swanan",
        notification: "has booked this Room for 3 days",
        time : "35 minutes ago"
    },
]
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik'


import { IoMdCloseCircle } from 'react-icons/io'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import { BASE_URL } from '../../../../utils/config';

import './destinationlist.css'
import { toast } from 'react-hot-toast';

function createData(
    destination,
    resort,
    place,
    closing_time,
    is_approved,
    id
) {
    return { destination, resort, place,closing_time, is_approved, id };
}


function DestinationList() {
    const [destinationList, setDestinationList] = useState([])
    const [singleDestination, setSingleDestination] = useState({})
    const [resortList, setResortList] = useState([])
    const [toggle, setToggle] = useState(false)
    const [addToggle, setAddToggle] = useState(false)
    const [updateToggle, setUpdateToggle] = useState(false)

    useEffect(()=>{
        getDestinations();
    }, [])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    async function getDestinations() {
        const response = await axios.get(`${BASE_URL}/resorts/stafflistdestination/${user_id}`)
        setDestinationList(response.data)
    }

    const rows = [
        ...destinationList.map((item) => (
            createData(item.spot_name, item.resort, item.place, item.close_time, item.is_approved, item.id)

        ))
    ];

    const formik = useFormik({
        initialValues: {
            owner : user_id,
            spot_name: '',
            place: '',
            about: '',
            resort: null,
            start_time: '',
            close_time: '',
            image_one: null,
            image_two: null,
            image_three: null
        },
        onSubmit: async values => {
            const form = new FormData()
            form.append('owner', formik.values.owner)
            form.append('spot_name', formik.values.spot_name)
            form.append('place', formik.values.place)
            form.append('about', formik.values.about)
            form.append('resort', formik.values.resort)
            form.append('start_time', formik.values.start_time)
            form.append('close_time', formik.values.close_time)
            form.append('image_one', formik.values.image_one)
            form.append('image_two', formik.values.image_two)
            form.append('image_three', formik.values.image_three)

            const response = await axios.post(`${BASE_URL}/resorts/stafflistdestination/`, form)

            getDestinations();
            setAddToggle(!addToggle)
            
        }
    })

    async function getResorts() {
        const response = await axios.get(`${BASE_URL}/resorts/resortslist/?user_id=${user_id}`)
        setResortList(response.data)
    }
    async function handleAddnew() {
        getResorts();
        setAddToggle(!addToggle)
    }
    async function getActivity(id) {
        console.log(id);
        const response = await axios.get(`${BASE_URL}/resorts/getdestinationdetail/${id}`)
        setSingleDestination(response.data)
    }
    async function searchDestination(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/searchdestination/?search=${keyword}`)
        setDestinationList(response.data)
    }

    return (
        <div className="Maindash">
            <h1>Destinations</h1>
            <div className="header">
                <input className='search-resort' type="text" placeholder='Search Activity'
                onChange={(e)=>searchDestination(e.target.value)}
                />
                <h3 className='add-resort-btn' onClick={handleAddnew}>Add new Destination</h3>
            </div>
            {toggle ? <div className='pop-update-adv'>
                <div className="pending-reso-details">
                    <div className='resort-name-toggle'>
                        <h2>Destination : {singleDestination.spot_name}</h2>
                        <IoMdCloseCircle size={30} onClick={() => setToggle(!toggle)} />
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <h3>Resort Near : {singleDestination.resort}</h3>
                        <h3>Place : {singleDestination.place} </h3>
                    </div>
                    <div className="resort-images">
                        <h4>Destination Images :</h4>
                        <img src={`${BASE_URL}/${singleDestination.image_one}`} alt="" />
                        <img src={`${BASE_URL}/${singleDestination.image_two}`} alt="" />
                        {singleDestination.image_three ? <img src={`${BASE_URL}/${singleDestination.image_three}`} alt="" /> : null}

                    </div>
                    <p><b>About Activity : {singleDestination.about}</b> <br /></p>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <p><b>Slot Available : {singleDestination.start_time} </b></p>
                        <p><b>Time Take : {singleDestination.close_time} </b></p>
                    </div>
                </div>
            </div> : null}

            {addToggle ? <div className="pop-update-adv">
                <div>
                    <div className='resort-name-toggle'>
                        <h2>Add New Destination</h2>
                        <IoMdCloseCircle size={30} onClick={() => setAddToggle(!addToggle)} />
                    </div>
                </div>
                <form className='add-adv-form' onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input className='input-group' type="text" name='spot_name' placeholder='destination name'
                            onChange={formik.handleChange}
                            value={formik.values.spot_name}
                        />
                        <input className='input-group' type="text" name='place' placeholder='place'
                            onChange={formik.handleChange}
                            value={formik.values.place}
                        />
                    </div>
                    <div className="form-group">
                        
                        <select name="resort"
                            onChange={formik.handleChange}
                            value={formik.values.resort}
                        >
                            <option value="">Select your resort</option>
                            {resortList.map((item) => (
                                <option value={item.id}>{item.resort_name}</option>
                            ))}
                        </select>
                    </div>
                    <textarea name="about" placeholder='about the adventure activity' rows={6}
                        onChange={formik.handleChange}
                        value={formik.values.about}
                    ></textarea>
                    <div className="form-group">
                        <input className='input-group' type="time" name='start_time' placeholder='starting time'
                            onChange={formik.handleChange}
                            value={formik.values.start_time}
                        />
                        <input className='input-group' type="time" name='close_time' placeholder='closing time'
                            onChange={formik.handleChange}
                            value={formik.values.close_time}
                        />
                    </div>
                    <div className="form-group">
                        <input className='input-group' type="file" name='image_one'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('image_one', e.target.files[0])}

                        // onChange={(event) => {
                        //     setFieldValue("file", event.currentTarget.files[0]);
                        // }}
                        />
                        <input className='input-group' type="file" name='image_two'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('image_two', e.target.files[0])}

                        // onChange={(event) => {
                        //     setFieldValue("file", event.currentTarget.files[0]);
                        // }}
                        />
                        <input className='input-group' type="file" name='image_three'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('image_three', e.target.files[0])}


                        />
                    </div>
                    <button type='submit'>Add New</button>
                </form>

            </div> : null}

            <TableContainer component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Destination</TableCell>
                            <TableCell align="left">Near By</TableCell>
                            <TableCell align="left">Place</TableCell>
                            <TableCell align="left">Closing Time</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell align="left">{row.destination}</TableCell>
                                <TableCell align="left">{row.resort}</TableCell>
                                <TableCell align="left">{row.place}</TableCell>
                                <TableCell align="left">{row.closing_time}</TableCell>
                                <TableCell align="left">{row.is_approved ? <p style={{ color: "green" }}>Approved</p> : <p style={{ color: "red" }}>Pending</p>}</TableCell>
                                <TableCell align="left" className='Details'><div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <p onClick={() => getActivity(row.id).then(() => setToggle(!toggle))}>View</p>
                                    <p onClick={() => getActivity(row.id).then(getResorts).then(() => setUpdateToggle(!updateToggle))}>Edit</p></div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>


    )
}

export default DestinationList
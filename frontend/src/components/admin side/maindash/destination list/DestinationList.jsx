import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik'

import Select from 'react-select';
import { IoMdCloseCircle } from 'react-icons/io'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapbox_access_token } from '../../../../utils/config';
import Point from '../../../../images/marker.png'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import { BASE_URL } from '../../../../utils/config';
import { AddDestinationSchema } from '../../../../validations/FormValidation';

import './destinationlist.css'
import { toast, Toaster } from 'react-hot-toast';

function createData(
    destination,
    resort,
    place,
    closing_time,
    is_approved,
    id
) {
    return { destination, resort, place, closing_time, is_approved, id };
}


function DestinationList() {
    const [destinationList, setDestinationList] = useState([])
    const [singleDestination, setSingleDestination] = useState({})
    const [resortList, setResortList] = useState([])
    const [toggle, setToggle] = useState(false)
    const [addToggle, setAddToggle] = useState(false)
    const [updateToggle, setUpdateToggle] = useState(false)

    const [coordinates, setCoordinates] = useState('');

    useEffect(() => {
        getDestinations();
    }, [])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    async function getDestinations() {
        const response = await axios.get(`${BASE_URL}/resorts/stafflistdestination/${user_id}`)
        setDestinationList(response.data)
    }

    const Map = ReactMapboxGl({
        accessToken: mapbox_access_token
    });

    const handleClick = (map, event) => {
        setCoordinates([event.lngLat.lng, event.lngLat.lat]);

    }
    const [lng, lat] = coordinates
    const map_location = String(lat) + ',' + String(lng)


    const rows = [
        ...destinationList.map((item) => (
            createData(item.spot_name, item.resort, item.place, item.close_time, item.is_approved, item.id)

        ))
    ];

    const formik = useFormik({
        initialValues: {
            owner: user_id,
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
        validationSchema: AddDestinationSchema,
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

            if (response.data.msg === 504) {
                toast.error('Destination did"t added')
            } else {
                toast.success('Destination added successfully')
            }

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
    async function getDestination(id) {
        console.log(id);
        const response = await axios.get(`${BASE_URL}/resorts/getdestinationdetail/${id}`)
        setSingleDestination(response.data)
    }
    async function handleDelete(resort_id) {
        const response = await axios.delete(`${BASE_URL}/resorts/stafflistdestination/${resort_id}`)
        if (response.data.msg === 200) {
            getDestinations();
            setUpdateToggle(!updateToggle)
            toast.success('Deleted successfully')
        } else {
            toast.error('Something went wrong')
        }
    }
    async function searchDestination(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/searchdestination/${user_id}?search=${keyword}`)
        setDestinationList(response.data)
    }

    const formik2 = useFormik({
        initialValues: {
            owner: user_id,
            spot_name: singleDestination.spot_name,
            place: singleDestination.place,
            about: singleDestination.about,
            resort: singleDestination.resort,
            start_time: singleDestination.start_time,
            close_time: singleDestination.close_time,
            image_one: singleDestination.image_one,
            image_two: singleDestination.image_two,
            image_three: singleDestination.image_three
        },
        validationSchema: AddDestinationSchema,
        onSubmit: async values => {
            const form2 = new FormData()
            form2.append('owner', values.owner)
            form2.append('spot_name', values.spot_name)
            form2.append('place', values.place)
            form2.append('about', values.about)
            form2.append('resort', values.resort)
            form2.append('start_time', values.start_time)
            form2.append('close_time', values.close_time)
            form2.append('image_one', values.image_one)
            form2.append('image_two', values.image_two)
            form2.append('image_three', values.image_three)

            const response = await axios.put(`${BASE_URL}/resorts/stafflistdestination/${singleDestination.id}`, form2)

            if (response.data.msg === 200) {
                toast.success('Updated successfully')
            } else if (response.data.msg === 404) {
                toast.error('Something went wrong')
            } else {
                toast.error('Internal server error')
            }
            getDestinations();
            setUpdateToggle(!updateToggle)
        }
    })

    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Approved' },
        { value: 2, label: 'Pending' }
    ]

    const handleFilter = async (option) => {
        const response = await axios.get(`${BASE_URL}/resorts/filterdestination/${user_id}/${option.value}`)
        setDestinationList(response.data)
    }

    return (
        <div className="Maindash">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h1>Destinations</h1>
            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search Resort'
                        onChange={e => searchDestination(e.target.value)}
                    />
                    <Select className='drop-locations' options={options} onChange={handleFilter} />
                </div>
                <h3 className='add-resort-btn' onClick={handleAddnew}>Add new Destination</h3>
            </div>
            {toggle ? <div className='pop-update-adv'>
                <div className="pending-reso-details">
                    <div className='resort-name-toggle'>
                        <h2>Destination : {singleDestination.spot_name}</h2>
                        <IoMdCloseCircle size={30} onClick={() => setToggle(!toggle)} />
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <h3>Resort Near : {singleDestination.resort && singleDestination.resort.resort_name}</h3>
                        <h3>Place : {singleDestination.place} </h3>
                    </div>
                    <div className="resort-images">
                        <h4>Destination Images :</h4>
                        <div className="destination-view-image-container">
                            <div className="single-destination-view-contain">
                                <img className='view-destination-single-img' src={`${BASE_URL}/${singleDestination.image_one}`} alt="" />

                            </div>
                            <div className="single-destination-view-contain">
                                <img className='view-destination-single-img' src={`${BASE_URL}/${singleDestination.image_two}`} alt="" />

                            </div>
                            <div className="single-destination-view-contain">
                                {singleDestination.image_three ? <img className='view-destination-single-img' src={`${BASE_URL}/${singleDestination.image_three}`} alt="" /> : null}

                            </div>
                        </div>


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
                    <div className="add-destination-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Spot Name</label>
                            <input className='add-destination-input' type="text" name='spot_name' placeholder='destination name'
                                onChange={formik.handleChange}
                                value={formik.values.spot_name}
                            />
                            {formik.errors.spot_name && formik.touched.spot_name ? <p className='form-errors'>{formik.errors.spot_name}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Place</label>
                            <input className='add-destination-input' type="text" name='place' placeholder='place'
                                onChange={formik.handleChange}
                                value={formik.values.place}
                            />
                            {formik.errors.place && formik.touched.place ? <p className='form-errors'>{formik.errors.place}</p> : null}
                        </div>
                    </div>
                    <div className="add-destination-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Starting Time</label>
                            <input className='add-destination-input' style={{ width: "17rem" }} type="time" name='start_time' placeholder='starting time'
                                onChange={formik.handleChange}
                                value={formik.values.start_time}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Closing Time</label>
                            <input className='add-destination-input' style={{ width: "17rem" }} type="time" name='close_time' placeholder='closing time'
                                onChange={formik.handleChange}
                                value={formik.values.close_time}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Your Resort</label>
                            <select name="resort" className='add-destination-input' style={{ width: "17rem" }}
                                onChange={formik.handleChange}
                                value={formik.values.resort}
                            >
                                <option value="">Select your resort</option>
                                {resortList.map((item) => (
                                    <option value={item.id}>{item.resort_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                        <label>About</label>
                        <textarea name="about" placeholder='about the adventure activity' rows={6}
                            className='add-destination-input' style={{ width: "25rem" }}
                            onChange={formik.handleChange}
                            value={formik.values.about}
                        ></textarea>
                        {formik.errors.about && formik.touched.about ? <p className='form-errors'>{formik.errors.about}</p> : null}
                    </div>

                    <div className="add-resort-map-container">
                        <label htmlFor="maplocation">Map Location</label>
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            zoom={[14]}
                            containerStyle={{
                                height: '100%',
                                width: '100%'
                            }}
                            onClick={handleClick}
                        >
                            {coordinates.length > 0 && (
                                <Marker coordinates={coordinates} anchor="bottom">
                                    <img height={35} src={Point} alt="Marker" />
                                </Marker>
                            )}
                        </Map>

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
                    <button className='add-destination-btn' type='submit'>Add New</button>
                </form>

            </div> : null}

            {updateToggle ? <div className="pop-update-adv">
                <div>
                    <div className='resort-name-toggle'>
                        <h2>Update Destination</h2>
                        <IoMdCloseCircle size={30} onClick={() => setUpdateToggle(!updateToggle)} />
                    </div>
                </div>
                <form className='add-adv-form' onSubmit={formik2.handleSubmit}>
                    <div className="add-destination-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Spot Name</label>
                            <input className='add-destination-input' type="text" name='spot_name' placeholder='destination name'
                                onChange={formik2.handleChange}
                                // value={formik.values.spot_name}
                                defaultValue={singleDestination.spot_name}
                            />
                            {formik2.errors.spot_name && formik2.touched.spot_name ? <p className='form-errors'>{formik2.errors.spot_name}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Place</label>
                            <input className='add-destination-input' type="text" name='place' placeholder='place'
                                onChange={formik2.handleChange}
                                defaultValue={singleDestination.place}
                            />
                            {formik2.errors.place && formik2.touched.place ? <p className='form-errors'>{formik2.errors.place}</p> : null}
                        </div>
                    </div>
                    <div className="add-destination-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Starting Time</label>
                            <input className='add-destination-input' style={{ width: "17rem" }} type="time" name='start_time' placeholder='starting time'
                                onChange={formik2.handleChange}
                                defaultValue={singleDestination.start_time}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Closing Time</label>
                            <input className='add-destination-input' style={{ width: "17rem" }} type="time" name='close_time' placeholder='closing time'
                                onChange={formik2.handleChange}
                                defaultValue={singleDestination.close_time}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Your Resort</label>
                            <select name="resort" className='add-destination-input' style={{ width: "17rem" }}
                                onChange={formik2.handleChange}
                                defaultValue={singleDestination.resort}
                            >
                                <option value="">Select your resort</option>
                                {resortList.map((item) => (
                                    <option value={item.id}>{item.resort_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                        <label>About</label>
                        <textarea name="about" placeholder='about the adventure activity' rows={6}
                            className='add-destination-input' style={{ width: "25rem" }}
                            onChange={formik2.handleChange}
                            defaultValue={singleDestination.about}
                        ></textarea>
                        {formik.errors.about && formik.touched.about ? <p className='form-errors'>{formik.errors.about}</p> : null}
                    </div>

                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input className='input-group' type="file" name='image_one'
                                // onChange={formik.handleChange}
                                onChange={(e) => formik2.setFieldValue('image_one', e.target.files[0])}
                            />
                            <img style={{ height: "9rem", marginRight: "6px" }} src={`${BASE_URL}/${singleDestination.image_one}`} alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input className='input-group' type="file" name='image_two'
                                // onChange={formik.handleChange}
                                onChange={(e) => formik2.setFieldValue('image_two', e.target.files[0])}
                            />
                            <img style={{ height: "9rem", marginRight: "6px" }} src={`${BASE_URL}/${singleDestination.image_two}`} alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input className='input-group' type="file" name='image_three'
                                // onChange={formik.handleChange}
                                onChange={(e) => formik2.setFieldValue('image_three', e.target.files[0])}
                            />
                            <img style={{ height: "9rem", marginRight: "6px" }} src={`${BASE_URL}/${singleDestination.image_three}`} alt="" />
                        </div>
                    </div>
                    <button className='add-destination-btn' type='submit'>Update</button>
                    <button className='resort-delete-btn' onClick={() => handleDelete(singleDestination.id)}>Delete</button>
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
                                <TableCell align="left">{row.resort && row.resort.resort_name}</TableCell>
                                <TableCell align="left">{row.place}</TableCell>
                                <TableCell align="left">{row.closing_time}</TableCell>
                                <TableCell align="left">{row.is_approved ? <p style={{ color: "green" }}>Approved</p> : <p style={{ color: "red" }}>Pending</p>}</TableCell>
                                <TableCell align="left" className='Details'><div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <p onClick={() => getDestination(row.id).then(() => setToggle(!toggle))}>View</p>
                                    <p onClick={() => getDestination(row.id).then(getResorts).then(() => setUpdateToggle(!updateToggle))}>Edit</p></div>
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
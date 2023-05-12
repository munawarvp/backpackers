import React, { useState, useEffect } from 'react'
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

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../../helpers/auth';
import { BASE_URL } from '../../../../utils/config';
import { AddActivitySchema } from '../../../../validations/FormValidation';

import './adventurelist.css'
import { toast, Toaster } from 'react-hot-toast';

function createData(
    activity_name,
    resort,
    activity_type,
    place,
    is_approved,
    id
) {
    return { activity_name, resort, activity_type, place, is_approved, id };
}

function AdventueList() {
    const [activityList, setActivityList] = useState([])
    const [resortList, setResortList] = useState([])
    const [singleAdv, setSingleAdv] = useState({})
    const [toggle, setToggle] = useState(false)
    const [addToggle, setAddToggle] = useState(false)
    const [updateToggle, setUpdateToggle] = useState(false)

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    async function getAdventure() {
        const response = await axios.get(`${BASE_URL}/resorts/stafflistadventure/${user_id}`)
        setActivityList(response.data)
    }
    async function getResorts() {
        const response = await axios.get(`${BASE_URL}/resorts/resortslist/?user_id=${user_id}`)
        setResortList(response.data)
    }


    useEffect(() => {
        getAdventure();
    }, [])  

    const formik = useFormik({
        initialValues: {
            owner: user_id,
            activity_name: '',
            activity_type: '',
            place: '',
            time_take: '',
            resort: null,
            about: '',
            day_slot: null,
            safety: '',
            price: null,
            activity_one: null,
            activity_two: null,
            activity_three: null
        },
        validationSchema: AddActivitySchema,

        onSubmit: async values => {
            const form = new FormData()
            form.append('owner', formik.values.owner)
            form.append('activity_name', formik.values.activity_name)
            form.append('activity_type', formik.values.activity_type)
            form.append('place', formik.values.place)
            form.append('time_take', formik.values.time_take)
            form.append('resort', formik.values.resort)
            form.append('about', formik.values.about)
            form.append('day_slot', formik.values.day_slot)
            form.append('safety', formik.values.safety)
            form.append('price', formik.values.price)
            form.append('activity_one', formik.values.activity_one)
            form.append('activity_two', formik.values.activity_two)
            form.append('activity_three', formik.values.activity_three)

            const response = await axios.post(`${BASE_URL}/resorts/stafflistadventure/`, form)
            if (response.data.msg === 200) {
                toast.success('Added Sucessfully')
            } else {
                toast.error('Something went wrong')
            }
            getAdventure();
            setAddToggle(!addToggle)
        }
    })

    const rows = [
        ...activityList.map((item) => (
            createData(item.activity_name, item.resort, item.activity_type, item.place, item.is_approved, item.id)

        ))
    ];

    async function getActivity(id) {
        console.log(id);
        const response = await axios.get(`${BASE_URL}/resorts/getadventuredetail/${id}`)
        setSingleAdv(response.data)
    }

    async function handleAddnew() {
        getResorts();
        setAddToggle(!addToggle)
    }

    async function handleDelete(resort_id) {
        const response = await axios.delete(`${BASE_URL}/resorts/stafflistadventure/${resort_id}`)
        if (response.data.msg === 200) {
            getAdventure();
            setUpdateToggle(!updateToggle)
            toast.success('Deleted successfully')
        } else {
            toast.error('Something went wrong')
        }
    }

    async function searchActivity(keyword) {
        const response = await axios.get(`${BASE_URL}/resorts/searchadventure/${user_id}?search=${keyword}`)
        setActivityList(response.data)
        // setActivityList(activityList.filter(item => item.activity_name.includes(keyword)))
    }

    const closePopup = () => {
        console.log(formik.errors);
        formik.setErrors({})
        setToggle(!toggle)
    }

    const formik2 = useFormik({
        initialValues: {
            owner: user_id,
            activity_name: singleAdv.activity_name,
            activity_type: singleAdv.activity_type,
            place: singleAdv.place,
            time_take: singleAdv.time_take,
            resort: singleAdv.resort,
            about: singleAdv.about,
            day_slot: singleAdv.day_slot,
            safety: singleAdv.safety,
            price: singleAdv.price,
            activity_one: singleAdv.activity_one,
            activity_two: singleAdv.activity_twoo,
            activity_three: singleAdv.activity_three
        },
        onSubmit: async values => {
            console.log(singleAdv.id);
            const form2 = new FormData()
            form2.append('owner', values.owner)
            form2.append('activity_name', values.activity_name)
            form2.append('activity_type', values.activity_type)
            form2.append('place', values.place)
            form2.append('time_take', values.time_take)
            form2.append('resort', values.resort)
            form2.append('about', values.about)
            form2.append('day_slot', formik2.values.day_slot)
            form2.append('safety', formik2.values.safety)
            form2.append('price', formik.values.price)
            form2.append('activity_one', formik2.values.activity_one)
            form2.append('activity_two', formik2.values.activity_two)
            form2.append('activity_three', formik2.values.activity_three)

            const response = await axios.put(`${BASE_URL}/resorts/stafflistadventure/${singleAdv.id}`, form2)

            if (response.data.msg === 404) {
                toast.error('didnt updated')
            }
            else {
                toast.success('updated successfully')
                setUpdateToggle(!updateToggle)
            }
        }
    })
    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Approved' },
        { value: 2, label: 'Pending' }
    ]
    const handleFilter = async (option)=> {
        const response = await axios.get(`${BASE_URL}/resorts/filteractivity/${user_id}/${option.value}`)
        setActivityList(response.data)
    }
    return (
        <div className="MainDash">
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <h1>Adventures</h1>
            <div className="header">
                <div className="resort-list-header-left">
                    <input className='search-resort' type="text" placeholder='Search Resort'
                        onChange={e => searchActivity(e.target.value)}
                    />
                    <Select className='drop-locations' options={options} onChange={handleFilter} />
                </div>
                <h3 className='add-resort-btn' onClick={handleAddnew}>Add new Activity</h3>
            </div>
            {toggle ? <div className='pop-update-adv'>
                <div className="pending-reso-details">
                    <div className='resort-name-toggle'>
                        <h2>Activity Name : {singleAdv.activity_name}</h2>
                        <IoMdCloseCircle size={30} onClick={closePopup} />
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <h3>Activity Type : {singleAdv.activity_type}</h3>
                        <h3>Place : {singleAdv.place} </h3>
                    </div>
                    <div className="resort-images">
                        <h4>Activity Images :</h4>
                        <img style={{ height: "9rem" }} src={`${BASE_URL}/${singleAdv.activity_one}`} alt="" />
                        <img style={{ height: "9rem" }} src={`${BASE_URL}/${singleAdv.activity_two}`} alt="" />
                        {singleAdv.activity_three ? <img style={{ height: "9rem" }} src={`${BASE_URL}/${singleAdv.activity_three}`} alt="" /> : null}

                    </div>
                    <p><b>About Activity : {singleAdv.about}</b> <br /></p>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <p><b>Slot Available : {singleAdv.day_slot} </b></p>
                        <p><b>Time Take : {singleAdv.time_take} </b></p>
                    </div>
                    <p><b>Safety Measures: {singleAdv.safety}</b> <br /></p>
                </div>
            </div> : null}
            {addToggle ? <div className="pop-update-adv">
                <div>
                    <div className='resort-name-toggle'>
                        <h2>Add New Adventure</h2>
                        <IoMdCloseCircle size={30} onClick={() => setAddToggle(!addToggle)} />
                    </div>
                </div>
                <form className='add-adv-form' onSubmit={formik.handleSubmit}>
                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Activity Name</label>
                            <input className='add-activity-input' type="text" onBlur={formik.handleBlur} name='activity_name' placeholder='activity name'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.activity_name && formik.touched.activity_name ? <p className='form-errors'>{formik.errors.activity_name}</p> : null}

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Activity Type</label>
                            <input className='add-activity-input' type="text" name='activity_type' placeholder='activity type'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.activity_type && formik.touched.activity_type ? <p className='form-errors'>{formik.errors.activity_type}</p> : null}
                        </div>

                    </div>
                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Place</label>
                            <input className='add-activity-input' type="text" name='place' placeholder='place'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.place && formik.touched.place ? <p className='form-errors'>{formik.errors.place}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Time Take</label>
                            <input className='add-activity-input' type="text" name='time_take' placeholder='time take'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.time_take && formik.touched.time_take ? <p className='form-errors'>{formik.errors.time_take}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Your Resort</label>
                            <select name="resort"
                                className='add-activity-input'
                                style={{ width: "10rem" }}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select your resort</option>
                                {resortList.map((item) => (
                                    <option value={item.id}>{item.resort_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                        <label>About Activity</label>
                        <textarea name="about" placeholder='about the adventure activity' rows={6}
                            className='add-activity-input'
                            style={{ width: "25rem" }}
                            onChange={formik.handleChange}

                        ></textarea>
                        {formik.errors.about && formik.touched.about ? <p className='form-errors'>{formik.errors.about}</p> : null}
                    </div>

                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Slots In Day</label>
                            <input className='add-activity-input' type="text" name='day_slot' placeholder='Slots available'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.day_slot && formik.touched.day_slot ? <p className='form-errors'>{formik.errors.day_slot}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Safety</label>
                            <input className='add-activity-input' type="text" name='safety' placeholder='safety'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.safety && formik.touched.safety ? <p className='form-errors'>{formik.errors.safety}</p> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Safety</label>
                            <input className='add-activity-price-input' type="number" name='price' placeholder='price'
                                onChange={formik.handleChange}
                            />
                            
                        </div>
                    </div>
                    <div>
                        <input type="file" name='activity_one'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('activity_one', e.target.files[0])}

                        // onChange={(event) => {
                        //     setFieldValue("file", event.currentTarget.files[0]);
                        // }}
                        />
                        <input className='input-group' type="file" name='activity_two'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('activity_two', e.target.files[0])}

                        // onChange={(event) => {
                        //     setFieldValue("file", event.currentTarget.files[0]);
                        // }}
                        />
                        <input className='input-group' type="file" name='activity_three'
                            // onChange={formik.handleChange}
                            onChange={(e) => formik.setFieldValue('activity_three', e.target.files[0])}
                        />
                    </div>

                    <button className='activity-add-btn' type='submit'>Add New</button>

                </form>

            </div> : null}

            {updateToggle ? <div className="pop-update-adv">
                <div>
                    <div className='resort-name-toggle'>
                        <h2>Update Adventure</h2>
                        <IoMdCloseCircle size={30} onClick={() => setUpdateToggle(!updateToggle)} />
                    </div>
                </div>
                <form className='add-adv-form' onSubmit={formik2.handleSubmit}>
                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Activity Name</label>
                            <input className='add-activity-input' type="text" name='activity_name' placeholder='activity name'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.activity_name}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Activity Type</label>
                            <input className='add-activity-input' type="text" name='activity_type' placeholder='activity type'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.activity_type}
                            />
                        </div>

                    </div>
                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Place</label>
                            <input className='add-activity-input' type="text" name='place' placeholder='place'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.place}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Time Take</label>
                            <input className='add-activity-input' type="text" name='time_take' placeholder='time take'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.time_take}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Your Resort</label>
                            <select name="resort"
                                className='add-activity-input'
                                style={{ width: "10rem" }}
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.resort}
                            >
                                <option value="">Select your resort</option>
                                {resortList.map((item) => (
                                    <option value={item.id}>{item.resort_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                        <label>About Activity</label>
                        <textarea name="about" placeholder='about the adventure activity' rows={6}
                            className='add-activity-input'
                            style={{ width: "25rem" }}
                            onChange={formik2.handleChange}
                            defaultValue={singleAdv.about}
                        ></textarea>
                    </div>

                    <div className="add-activity-row">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Slots In Day</label>
                            <input className='add-activity-input' type="text" name='day_slot' placeholder='Slots available'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.day_slot}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Safety</label>
                            <input className='add-activity-input' type="text" name='safety' placeholder='safety'
                                onChange={formik2.handleChange}
                                defaultValue={singleAdv.safety}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "17px" }}>
                            <label>Price</label>
                            <input className='add-activity-price-input' type="number" name='price' placeholder='price'
                                onChange={formik.handleChange}
                                defaultValue={singleAdv.price}
                            />
                            
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input type="file" name='activity_one'

                                onChange={(e) => formik2.setFieldValue('activity_one', e.target.files[0])}
                            />
                            <img style={{ height: "9rem", marginRight: "6px" }} src={`${BASE_URL}/${singleAdv.activity_one}`} alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input className='input-group' type="file" name='activity_two'
                                onChange={(e) => formik2.setFieldValue('activity_two', e.target.files[0])}
                            />
                            <img style={{ height: "9rem", marginRight: "6px" }} src={`${BASE_URL}/${singleAdv.activity_two}`} alt="" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <input className='input-group' type="file" name='activity_three'
                                // onChange={formik.handleChange}
                                onChange={(e) => formik2.setFieldValue('activity_three', e.target.files[0])}
                            />
                            <img style={{ height: "9rem" }} src={`${BASE_URL}/${singleAdv.activity_three}`} alt="" />
                        </div>
                    </div>

                    <button className='activity-add-btn' type='submit'>Update</button>
                    <button className='resort-delete-btn' onClick={() => handleDelete(singleAdv.id)}>Delete</button>

                </form>

            </div> : null}

            <TableContainer component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Activity Name</TableCell>
                            <TableCell align="left">Conducting By</TableCell>
                            <TableCell align="left">Activity Type</TableCell>
                            <TableCell align="left">Place</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell align="left">{row.activity_name}</TableCell>
                                <TableCell align="left">{row.resort ? row.resort.resort_name : null}</TableCell>
                                <TableCell align="left">{row.activity_type}</TableCell>
                                <TableCell align="left">{row.place}</TableCell>
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

export default AdventueList
import React, { useState, useEffect } from 'react'
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

import './adventurelist.css'
import { toast } from 'react-hot-toast';

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
            owner : user_id,
            activity_name: '',
            activity_type: '',
            place: '',
            time_take: '',
            resort: null,
            about: '',
            day_slot: null,
            safety: '',
            activity_one: null,
            activity_two: null,
            activity_three: null
        },
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
            form.append('activity_one', formik.values.activity_one)
            form.append('activity_two', formik.values.activity_two)
            form.append('activity_three', formik.values.activity_three)

            const response = await axios.post(`${BASE_URL}/resorts/stafflistadventure/`, form)

            if (response.status === 200){
                toast.success('Added Sucessfully')
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

    async function updateActivity(id) {
        setUpdateToggle(!updateToggle)
    }

    async function searchActivity(keyword) {
        // const response = await axios.get(`${BASE_URL}/resorts/searchadventure/?search=${keyword}`)
        // setActivityList(response.data)
        setActivityList(activityList.filter(item => item.activity_name.includes(keyword)))
    }

    return (
        <div className="MainDash">
            <h1>Adventures</h1>
            <div className="header">
                <input className='search-resort' type="text" placeholder='Search Activity'
                onChange={(e)=>searchActivity(e.target.value)}
                />
                <h3 className='add-resort-btn' onClick={handleAddnew}>Add new Activity</h3>
            </div>
            {toggle ? <div className='pop-update-adv'>
                <div className="pending-reso-details">
                    <div className='resort-name-toggle'>
                        <h2>Activity Name : {singleAdv.activity_name}</h2>
                        <IoMdCloseCircle size={30} onClick={() => setToggle(!toggle)} />
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                        <h3>Activity Type : {singleAdv.activity_type}</h3>
                        <h3>Place : {singleAdv.place} </h3>
                    </div>
                    <div className="resort-images">
                        <h4>Activity Images :</h4>
                        <img src={`${BASE_URL}/${singleAdv.activity_one}`} alt="" />
                        <img src={`${BASE_URL}/${singleAdv.activity_two}`} alt="" />
                        {singleAdv.activity_three ? <img src={`${BASE_URL}/${singleAdv.activity_three}`} alt="" /> : null}

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
                                <div className="form-group">
                                    <input className='input-group' type="text" name='activity_name' placeholder='activity name'
                                    onChange={formik.handleChange}
                                    
                                    />
                                    <input className='input-group' type="text" name='activity_type' placeholder='activity type'
                                    onChange={formik.handleChange}
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <input className='input-group' type="text" name='place' placeholder='place'
                                    onChange={formik.handleChange}
                                    
                                    />
                                    <input className='input-group' type="text" name='time_take' placeholder='time take'
                                    onChange={formik.handleChange}
                                    
                                    />
                                    <select name="resort"
                                    onChange={formik.handleChange}
                                    
                                    >
                                        <option value="">Select your resort</option>
                                        {resortList.map((item)=> (
                                            <option value={item.id}>{item.resort_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <textarea name="about" placeholder='about the adventure activity' rows={6}
                                onChange={formik.handleChange}
                                
                                ></textarea>
                                <div className="form-group">
                                    <input className='input-group' type="text" name='day_slot' placeholder='Slots available'
                                    onChange={formik.handleChange}
                                    
                                    />
                                    <input className='input-group' type="text" name='safety' placeholder='safety'
                                    onChange={formik.handleChange}
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <input className='input-group' type="file" name='activity_one'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_one', e.target.files[0])}
                                    
                                    // onChange={(event) => {
                                    //     setFieldValue("file", event.currentTarget.files[0]);
                                    // }}
                                    />
                                    <input className='input-group' type="file" name='activity_two'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_two', e.target.files[0])}
                                    
                                    // onChange={(event) => {
                                    //     setFieldValue("file", event.currentTarget.files[0]);
                                    // }}
                                    />
                                    <input className='input-group' type="file" name='activity_three'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_three', e.target.files[0])}
                                    
                                    
                                    />
                                </div>
                                <button type='submit'>Add New</button>
                            </form>
                            
                         </div> : null}

                         {updateToggle ? <div className="pop-update-adv">
                            <div>
                                <div className='resort-name-toggle'>
                                    <h2>Update Adventure</h2>
                                    <IoMdCloseCircle size={30} onClick={() => setUpdateToggle(!updateToggle)} />
                                </div>
                            </div>
                            <form className='add-adv-form' onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <input className='input-group' type="text" name='activity_name' placeholder='activity name'
                                    onChange={formik.handleChange}
                                    value={formik.values.activity_name}
                                    defaultValue={singleAdv.activity_name}
                                    />
                                    <input className='input-group' type="text" name='activity_type' placeholder='activity type'
                                    onChange={formik.handleChange}
                                    value={formik.values.activity_type}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className='input-group' type="text" name='place' placeholder='place'
                                    onChange={formik.handleChange}
                                    value={formik.values.place}
                                    />
                                    <input className='input-group' type="text" name='time_take' placeholder='time take'
                                    onChange={formik.handleChange}
                                    value={formik.values.time_take}
                                    />
                                    <select name="resort"
                                    onChange={formik.handleChange}
                                    value={formik.values.resort}
                                    >
                                        <option value="">Select your resort</option>
                                        {resortList.map((item)=> (
                                            <option value={item.id}>{item.resort_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <textarea name="about" placeholder='about the adventure activity' rows={6}
                                onChange={formik.handleChange}
                                value={formik.values.about}
                                ></textarea>
                                <div className="form-group">
                                    <input className='input-group' type="text" name='day_slot' placeholder='Slots available'
                                    onChange={formik.handleChange}
                                    value={formik.values.day_slot}
                                    />
                                    <input className='input-group' type="text" name='safety' placeholder='safety'
                                    onChange={formik.handleChange}
                                    value={formik.values.safety}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className='input-group' type="file" name='activity_one'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_one', e.target.files[0])}
                                    
                                    // onChange={(event) => {
                                    //     setFieldValue("file", event.currentTarget.files[0]);
                                    // }}
                                    />
                                    <input className='input-group' type="file" name='activity_two'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_two', e.target.files[0])}
                                    
                                    // onChange={(event) => {
                                    //     setFieldValue("file", event.currentTarget.files[0]);
                                    // }}
                                    />
                                    <input className='input-group' type="file" name='activity_three'
                                    // onChange={formik.handleChange}
                                    onChange={(e)=>formik.setFieldValue('activity_three', e.target.files[0])}
                                    
                                    
                                    />
                                </div>
                                <button type='submit'>Update</button>
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
                                <TableCell align="left">{row.resort}</TableCell>
                                <TableCell align="left">{row.activity_type}</TableCell>
                                <TableCell align="left">{row.place}</TableCell>
                                <TableCell align="left">{row.is_approved ? <p style={{color:"green"}}>Approved</p> : <p style={{color:"red"}}>Pending</p>}</TableCell>
                                <TableCell align="left" className='Details'><div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <p onClick={() => getActivity(row.id).then(()=>setToggle(!toggle))}>View</p>
                                    <p onClick={() => getActivity(row.id).then(getResorts).then(()=>setUpdateToggle(!updateToggle))}>Edit</p></div>
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
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './registerwithus.css'
import Background from '../../../images/register-with-us.jpg'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useFormik } from 'formik'
import { RegisterWithSchema } from '../../../validations/FormValidation'
import { BASE_URL } from '../../../utils/config'
import axios from 'axios'
import { toast } from 'react-hot-toast'


function RegisterWithUs() {
    const [locationList, setLocationlist] = useState([]);
    const [owner, setOwner] = useState(null);

    const history = useNavigate()

    useEffect(() => {
        async function locations() {
            const response = await axios.get(`${BASE_URL}/resorts/locations/`)
            setLocationlist(response.data)
        }
        locations();
        const user = getLocal()
        const data = jwtDecode(user)
        setOwner(data.user_id)
    }, [])

    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    const formik = useFormik({
        initialValues: {
            owner: user_id,
            resort_name: '',
            place: '',
            location: null,
            price: null,
            address: '',
            zipcode: '',
            phone_number: '',
            rooms_available: null,
            room_type: '',
            description: '',
            wifi_available: false,
            pool_available: false,
            image_one: null,
            image_two: null,
            image_three: null,
            image_four: null,
        },
        validationSchema: RegisterWithSchema,

        onSubmit: async values => {
            const form = new FormData()
            form.append('owner', formik.values.owner)
            form.append('resort_name', formik.values.resort_name)
            form.append('place', formik.values.place)
            form.append('price', formik.values.price)
            form.append('address', formik.values.address)
            form.append('zipcode', formik.values.zipcode)
            form.append('phone_number', formik.values.phone_number)
            form.append('rooms_available', formik.values.rooms_available)
            form.append('location', formik.values.location)
            form.append('room_type', formik.values.room_type)
            form.append('description', formik.values.description)
            form.append('wifi_available', formik.values.wifi_available)
            form.append('pool_available', formik.values.pool_available)
            form.append('image_one', formik.values.image_one)
            form.append('image_two', formik.values.image_two)
            form.append('image_three', formik.values.image_three)
            form.append('image_four', formik.values.image_four)

            const response = await axios.post(`${BASE_URL}/resorts/createresorts/`, form)
            if (response.data.msg === 200) {
                toast.success('Resort added successfully')
                history('/register-success')
            } else if (response.data.msg === 404) {
                toast.error('Something went wrong')
            }
        }

    })
    // console.log(formik.errors);
    return (
        <div className='registerwith-main-container'>
            <div className="login-background-contain">
                <img src={Background} alt="" />
            </div>
            <div className="image-form-container">

                <div className="form-only-container">
                    <h2 className='titles'>REGISTER WITH US</h2>
                    <form className='registerwith-form' onSubmit={formik.handleSubmit}>
                        <div className='registerwith-two-col'>
                            <div >
                                <label htmlFor="resort_name" style={{ display: 'block' }}>Resort Name</label>
                                <input className='registerwith-input' name='resort_name' type="text"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.resort_name && formik.touched.resort_name ? <p className='form-errors'>{formik.errors.resort_name}</p> : null}
                            </div>
                            <div>
                                <label htmlFor="resort_type" style={{ display: 'block' }}>Place</label>
                                <input className='registerwith-input' name='place' type="text"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.place && formik.touched.place ? <p className='form-errors'>{formik.errors.place}</p> : null}
                            </div>
                        </div>
                        <div className='registerwith-two-col'>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor='location'>Location</label>
                                <select className='registerwith-select' name="location" id="location"
                                    onChange={formik.handleChange}

                                >
                                    <option value="">Select an option</option>
                                    {locationList.map((item) => (
                                        <option value={item.id}>{item.city_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor="price">Price</label>
                                <input className='registerwith-input' name='price' type="number"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.price && formik.touched.price ? <p className='form-errors'>{formik.errors.price}</p> : null}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <label htmlFor="address">Address</label>
                            <textarea className='registerwith-select'
                                id="description"
                                name='address'
                                onChange={formik.handleChange}
                            ></textarea>
                            {formik.errors.address && formik.touched.address ? <p className='form-errors'>{formik.errors.address}</p> : null}
                        </div>
                        <div className='registerwith-two-col'>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor="zipcode">Zipcode</label>
                                <input className='registerwith-input' name='zipcode' type="text"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.zipcode && formik.touched.zipcode ? <p className='form-errors'>{formik.errors.zipcode}</p> : null}
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor="phone_number">Phone Number</label>
                                <input className='registerwith-input' name='phone_number' type="text"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.phone_number && formik.touched.phone_number ? <p className='form-errors'>{formik.errors.phone_number}</p> : null}
                            </div>
                        </div>
                        <div className='registerwith-two-col'>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor="rooms_available">Number Of Rooms</label>
                                <input className='registerwith-input' name='rooms_available' type="number"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.rooms_available && formik.touched.rooms_available ? <p className='form-errors'>{formik.errors.rooms_available}</p> : null}
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label htmlFor="room_type">Room Type</label>
                                <input className='registerwith-input' name='room_type' type="text"
                                    onChange={formik.handleChange}

                                />
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <label htmlFor="description">Description</label>
                            <textarea className='registerwith-select'
                                name='description'
                                id="description"
                                onChange={formik.handleChange}

                            ></textarea>
                        </div>
                        <div className='registerwith-two-col'>
                            <div>
                                <input
                                    type="checkbox"
                                    id="roomType"
                                    name='wifi_available'
                                    onChange={formik.handleChange}

                                />
                                <label htmlFor="wifi_available">Wifi available?</label>
                            </div>
                            <div>
                                <input

                                    type="checkbox"
                                    id="roomType"
                                    name='pool_available'
                                    onChange={formik.handleChange}

                                />
                                <label htmlFor="pool_available">Pool available?</label>
                            </div>
                        </div>
                        <div className='registerwith-two-col'>
                            <input
                                type="file"
                                id="roomType"
                                name='image_one'
                                onChange={e => formik.setFieldValue('image_one', e.target.files[0])}

                            />
                            <input
                                type="file"
                                id="roomType"
                                name='image_two'
                                onChange={e => formik.setFieldValue('image_two', e.target.files[0])}

                            />
                            <input
                                type="file"
                                id="roomType"
                                name='image_three'
                                onChange={e => formik.setFieldValue('image_three', e.target.files[0])}

                            />
                            <input
                                type="file"
                                id="roomType"
                                name='image_four'
                                onChange={e => formik.setFieldValue('image_four', e.target.files[0])}

                            />
                        </div>
                        <button className='registerwith-btn' type='submit'>Add Resort</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterWithUs
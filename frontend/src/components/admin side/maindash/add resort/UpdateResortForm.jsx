import React, { useEffect, useState } from 'react'
import '../maindash.css'
import './addresortform.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { BASE_URL } from '../../../../utils/config'
import { getLocal } from '../../../../helpers/auth'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { UpdateResortSchema } from '../../../../validations/FormValidation'

function UpdateResortForm() {

  const [locationList, setLocationlist] = useState([]);
  const [singleResort, setSingleResort] = useState({});

  useEffect(() => {
    locations();
    getResort();
  }, [])
  const resort_id = useParams()

  const history = useNavigate()

  async function locations() {
    const response = await axios.get(`${BASE_URL}/resorts/locations/`)
    setLocationlist(response.data)
  }
  async function getResort() {
    const response = await axios.get(`${BASE_URL}/resorts/createresorts/${resort_id.id}`)
    setSingleResort(response.data)
  }
  async function handleDelete(resort_id) {
    const response = await axios.delete(`${BASE_URL}/resorts/createresorts/${resort_id}`)
    if (response.data.msg === 200) {
      history('/staff/resorts')
    } else {
      toast.error('Something went wrong')
    }

  }
  const user = getLocal()
  const data = jwtDecode(user)
  const user_id = data.user_id
  const formik = useFormik({
    initialValues: {
      owner: user_id,
      resort_name: singleResort.resort_name,
      place: singleResort.place,
      location: singleResort.location,
      address: singleResort.address,
      zipcode: singleResort.zipcode,
      phone_number: singleResort.phone_number,
      rooms_available: singleResort.rooms_available,
      price: singleResort.price,
      room_type: singleResort.room_type,
      description: singleResort.description,
      wifi_available: false,
      pool_available: false,
      image_one: singleResort.image_one,
      image_two: singleResort.image_two,
      image_three: singleResort.image_three,
      image_four: singleResort.image_four,
    },
    validationSchema: UpdateResortSchema,
    onSubmit: async values => {

      const form = new FormData()
      form.append('owner', values.owner)
      form.append('resort_name', values.resort_name)
      form.append('place', values.place)
      form.append('location', values.location)
      form.append('address', values.address)
      form.append('zipcode', values.zipcode)
      form.append('phone_number', values.phone_number)
      form.append('rooms_available', values.rooms_available)
      form.append('price', values.price)
      form.append('room_type', values.room_type)
      form.append('description', values.description)
      form.append('wifi_available', values.wifi_available)
      form.append('pool_available', values.pool_available)
      form.append('image_one', values.image_one)
      form.append('image_two', values.image_two)
      { values.image_three && form.append('image_three', values.image_three) }
      { values.image_four && form.append('image_four', values.image_four) }

      const response = await axios.put(`${BASE_URL}/resorts/createresorts/${resort_id.id}`, form)
      if (response.data.msg === 200) {
        toast.success('Update success')
      } else if (response.data.msg === 500) {
        toast.error('Internal server issue')
      } else {
        toast.error('Something went wrong')
      }
      history('/staff/resorts')
    }
  })
  console.log(formik.errors);
  return (
    <div className="MainDash">
      <Toaster position='top-center' reverseOrder='false' ></Toaster>
      <div className="main-form-container">
        <h1>Add Your Resort Details</h1>
        <div className='form-container'>
          <form onSubmit={formik.handleSubmit} >
            <div className="two-input-row">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="resort">Resort Name</label>
                <input type="text" className='input-needed' name='resort_name'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.resort_name}
                />
                {formik.errors.resort_name && formik.touched.resort_name ? <p className='form-errors'>{formik.errors.resort_name}</p> : null}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="location">Place</label>
                <input type="text" id="location" className='input-needed' name='place'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.place}
                />
                {formik.errors.place && formik.touched.place ? <p className='form-errors'>{formik.errors.place}</p> : null}
              </div>
            </div>

            <div className="two-input-row">
              <div className='text-area-in-row'>
                <label htmlFor="address">Address</label>
                <textarea className='textarea-address input-needed'
                  id="description"
                  name='address'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.address}
                ></textarea>
                {formik.errors.address && formik.touched.address ? <p className='form-errors'>{formik.errors.address}</p> : null}
              </div>

              <div className='text-area-in-row'>
                <label htmlFor="description">Description</label>
                <textarea className='textarea-address input-needed'
                  id="description"
                  name='description'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.description}
                ></textarea>
              </div>

            </div>




            <div className="two-input-row">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  name='zipcode'
                  className='input-needed'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.zipcode}
                />
                {formik.errors.zipcode && formik.touched.zipcode ? <p className='form-errors'>{formik.errors.zipcode}</p> : null}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="roomType">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name='phone_number'
                  className='input-needed'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.phone_number}
                />
                {formik.errors.phone_number && formik.touched.phone_number ? <p className='form-errors'>{formik.errors.phone_number}</p> : null}
              </div>

              <div className='text-area-in-row'>
                <label htmlFor="address">Location</label>
                <select className='select-field input-needed' name="location" id="location"
                  onChange={formik.handleChange}
                  defaultValue={singleResort.location}
                >
                  <option value="">Select an option</option>
                  {locationList.map((item) => (
                    <option value={item.id}>{item.city_name}</option>
                  ))}
                </select>
                {formik.errors.location && formik.touched.location ? <p className='form-errors'>{formik.errors.location}</p> : null}
              </div>
            </div>

            <div className="two-input-row">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="numberOfRooms">Number of Rooms</label>
                <input
                  type="number"
                  id="numberOfRooms"
                  name='rooms_available'
                  className='input-needed'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.rooms_available}
                />
                {formik.errors.rooms_available && formik.touched.rooms_available ? <p className='form-errors'>{formik.errors.rooms_available}</p> : null}

              </div>

              <div>
                <label htmlFor="roomType">Room Type</label>
                <input
                  type="text"
                  id="roomType"
                  name='room_type'
                  className='input-needed'
                  onChange={formik.handleChange}
                  defaultValue={singleResort.room_type}
                />
                {formik.errors.room_type && formik.touched.room_type ? <p className='form-errors'>{formik.errors.room_type}</p> : null}
              </div>
              <div>
                <label htmlFor="roomType">Price</label>
                <input
                  type="number"
                  id="price"
                  name='price'
                  className='input-needed'
                  style={{ width: "20rem" }}
                  onChange={formik.handleChange}
                  defaultValue={singleResort.price}
                />
                {formik.errors.price && formik.touched.price ? <p className='form-errors'>{formik.errors.price}</p> : null}
              </div>
            </div>


            <div className='checks'>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                name='wifi_available'
                onChange={formik.handleChange}
                defaultValue={singleResort.wifi_available}
              />
              <label htmlFor="wifi">Wifi available?</label>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                name='pool_available'
                onChange={formik.handleChange}
                defaultValue={singleResort.pool_available}
              />
              <label htmlFor="wifi">Pool available?</label>
            </div>
            <div className="checks">
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className='resort-add-btn' type="submit">Submit</button>
              <button className='resort-delete-btn' onClick={() => handleDelete(singleResort.id)}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateResortForm
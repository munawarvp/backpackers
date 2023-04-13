import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../maindash.css'
import './addresortform.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { BASE_URL } from '../../../../utils/config'
import { getLocal } from '../../../../helpers/auth'
import { toast, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'


function AddResortForm() {
  const [owner, setOwner] = useState(null);
  const [resort_name, setResort] = useState('');
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [room_type, setRoomType] = useState('');
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [rooms_available, setNumberOfRooms] = useState(null);
  const [wifi_available, setWifi] = useState(false)
  const [pool_available, setPool] = useState(false)

  const [image_one, setImageOne] = useState(null)
  const [image_two, setImageTwo] = useState(null)
  const [image_three, setImageThree] = useState(null)
  const [image_four, setImageFour] = useState(null)

  const [locationList, setLocationlist] = useState([]);

  const history = useNavigate();

  useEffect(()=>{
    async function locations(){
      const response = await axios.get(`${BASE_URL}/resorts/locations/`)
      setLocationlist(response.data)
    }
    locations();
    const user = getLocal()
    const data = jwtDecode(user)
    setOwner(data.user_id)
  },[])

  // *************************************
  // formmik code
  // const formik = useFormik({
  //   initialValues: {
  //     resort_name: '',
  //     place: '',
  //     location: 1,
  //     address: '',
  //     zipcode: '',
  //     phone_number: '',
  //     room_type: '',
  //     price: 0,
  //     description: '',
  //     rooms_available: 0,
  //     wifi_available: false,
  //     pool_available: false,

  //     image_one: null,
  //     image_two: null,
  //     image_three: null,
  //     image_four: null,
  //   },
  //   onSubmit: async (values) => {

  //     const form = new FormData()
  //     form.append('owner', owner)

  //     for( const key in values){
  //       form.append(key, values[key])
  //     }

  //     const res = await axios({
  //       method: 'post',
  //       url: `${BASE_URL}/resorts/listresorts/`,
  //       data: form
  //     })
  //     console.log(res,'res');
      
      // form.append('resort_name',resort_name)
      // form.append('place',place)
      // form.append('location',location)
      // form.append('address',address)
      // form.append('zipcode',zipcode)
      // form.append('phone_number',phone_number)
      // form.append('rooms_available',rooms_available)
      // form.append('price',price)
      // form.append('room_type',room_type)
      // form.append('description',description)
      // form.append('wifi_available',wifi_available)
      // form.append('pool_available',pool_available)
      // form.append('image_one',image_one)
      // form.append('image_two',image_two)
      // form.append('image_four',image_three)
      // form.append('image_four',image_four)
  //   }
  // })
  // ********************************************

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const form = new FormData()
    form.append('owner', owner)
    form.append('resort_name',resort_name)
    form.append('place',place)
    form.append('location',location)
    form.append('address',address)
    form.append('zipcode',zipcode)
    form.append('phone_number',phone_number)
    form.append('rooms_available',rooms_available)
    form.append('price',price)
    form.append('room_type',room_type)
    form.append('description',description)
    form.append('wifi_available',wifi_available)
    form.append('pool_available',pool_available)
    form.append('image_one',image_one)
    form.append('image_two',image_two)
    form.append('image_three',image_three)
    form.append('image_four',image_four)
    console.log(image_one);
   
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/resorts/listresorts/`,
      data: form
    })
    console.log(res);
    if(res.status === 200){
      toast.success('200')
    }else{
      toast.error(res.statusText)
    }
  }

  

  return (
    <div className="MainDash">
      {/* <Toaster position='top-center' reverseOrder='false' ></Toaster> */}
        <h1>Add Your Resort Details</h1>
        <div>
        <form onSubmit={e => handleSubmit(e)} >
            <div className="form-group">
              <div className="label-group">
                <label htmlFor="resort">Resort Name</label>
                <label htmlFor="location">Place</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="resort"
                  name='resort_name'
                  // onChange={formik.handleChange}
                  // value={formik.values.resort_name}
                  onChange={e=>setResort(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="location"
                  // onChange={formik.handleChange}
                  name='place'
                  // value={formik.values.place}
                  onChange={e=>setPlace(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Location</label>
              <select className='select-field' name="location" id="location"
                // onChange={formik.handleChange}
                // value={formik.values.location}
                onChange={e=>setLocation(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                {locationList.map((item) => (
                  <option value={item.id}>{item.city_name}</option>
                ))}
              </select>
            </div>
            

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="description"
                name='address'
                // onChange={formik.handleChange}
                // value={formik.values.address}
                onChange={e=>setAddress(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <div className="label-group">
                <label htmlFor="zipcode">Zipcode</label>
                <label htmlFor="roomType">Phone Number</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="zipcode"
                  name='zipcode'
                  // onChange={formik.handleChange}
                  // value={formik.values.zipcode}
                  onChange={e=>setZipcode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="phoneNumber"
                  name='phone_number'
                  // onChange={formik.handleChange}
                  // value={formik.values.phone_number}
                  onChange={e=>setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-group">
                <label htmlFor="numberOfRooms">Number of Rooms</label>
                <label htmlFor="roomType">Room Type</label>
                <label htmlFor="roomType">Price</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  id="numberOfRooms"
                  name='rooms_available'
                  // onChange={formik.handleChange}
                  // value={formik.values.rooms_available}
                  onChange={e=>setNumberOfRooms(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="roomType"
                  name='room_type'
                  // onChange={formik.handleChange}
                  // value={formik.values.room_type}
                  onChange={e=>setRoomType(e.target.value)}
                  required
                />
                <input
                  type="number"
                  id="price"
                  name='price'
                  // onChange={formik.handleChange}
                  // value={formik.values.price}
                  onChange={e=>setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name='description'
                // onChange={formik.handleChange}
                // value={formik.values.description}
                onChange={e=>setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='checks'>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                name='wifi_available'
                // onChange={formik.handleChange}
                // value={formik.values.wifi_available}
                onChange={e=>setWifi(e.target.value)}
              />
              <label htmlFor="wifi">Wifi available?</label>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                name='pool_available'
                // onChange={formik.handleChange}
                // value={formik.values.pool_available}
                onChange={e=>setPool(e.target.value)}
                
              />
              <label htmlFor="wifi">Pool available?</label>
            </div>
            <div className="checks">
                <input
                  type="file"
                  id="roomType"
                  name='image_one'
                  // onChange={formik.handleChange}
                  // value={formik.values.image_one}
                  onChange={e=>setImageOne(e.target.files[0])}
                  required
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_two'
                  // onChange={formik.handleChange}
                  // value={formik.values.image_two}
                  onChange={e=>setImageTwo(e.target.files[0])}
                  required
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_three'
                  // onChange={formik.handleChange}
                  // value={formik.values.image_three}
                  onChange={e=>setImageThree(e.target.files[0])}
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_four'
                  // onChange={formik.handleChange}
                  // value={formik.values.image_four}
                  onChange={e=>setImageFour(e.target.files[0])}
                />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default AddResortForm
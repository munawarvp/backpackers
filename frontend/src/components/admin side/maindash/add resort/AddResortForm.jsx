import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../maindash.css'
import './addresortform.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { BASE_URL } from '../../../../utils/config'
import { getLocal } from '../../../../helpers/auth'
import { toast, Toaster } from 'react-hot-toast'


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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const form = new FormData()
    form.append('owner', owner)
    form.append('image_one',image_one)
    form.append('image_two',image_two)
    form.append('image_four',image_three)
    form.append('image_four',image_four)
    form.append('resort_name',resort_name)
    form.append('location',location)
    form.append('place',place)
    form.append('address',address)
    form.append('zipcode',zipcode)
    form.append('phone_number',phone_number)
    form.append('room_type',room_type)
    form.append('price',price)
    form.append('description',description)
    form.append('rooms_available',rooms_available)
    form.append('wifi_available',wifi_available)
    form.append('pool_available',pool_available)
    console.log(image_one);
   
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/resorts/listresorts/`,
      data: form
    })
    console.log(res);
    if(res.status === 200){
      history('/resorts')
    }else{
      toast.error(res.statusText)
    }
  }

  return (
    <div className="MainDash">
      <Toaster position='top-center' reverseOrder='false' ></Toaster>
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
                  onChange={(e) => setResort(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="location"
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Location</label>
              <select className='select-field' name="location" id="location"
                onChange={e=>setLocation(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  onChange={(e) => setNumberOfRooms(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="roomType"
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                />
                <input
                  type="number"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='checks'>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                onChange={e => setWifi(!wifi_available)}
                
              />
              <label htmlFor="wifi">Wifi available?</label>
              <input
                className='pool'
                type="checkbox"
                id="roomType"
                onChange={e => setPool(!pool_available)}
                
              />
              <label htmlFor="wifi">Pool available?</label>
            </div>
            <div className="checks">
                <input
                  type="file"
                  id="roomType"
                  name='image_one'
                  onChange={e => setImageOne(e.target.files[0])}
                  
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_two'
                  onChange={e => setImageTwo(e.target.files[0])}
                  
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_three'
                  onChange={e => setImageThree(e.target.files[0])}
                  
                />
                <input
                  type="file"
                  id="roomType"
                  name='image_four'
                  onChange={e => setImageFour(e.target.files[0])}
                  
                />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default AddResortForm
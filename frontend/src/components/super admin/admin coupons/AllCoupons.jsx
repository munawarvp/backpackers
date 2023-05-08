import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { Switch } from 'antd'
import { IoMdCloseCircle } from 'react-icons/io'
import DeleteIcon from '@mui/icons-material/Delete';
import { Toaster, toast } from 'react-hot-toast';

function AllCoupons() {
    const [allCoupons, setAllCoupons] = useState([])
    const [addToggle, setAddToggle] = useState(false)

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        coupons();
    }, [])

    async function coupons() {
        const response = await axios.get(`${BASE_URL}/bookings/adminlistcoupons/`)
        setAllCoupons(response.data)
    }

    const handleChange = (id) => {
        axios.get(`${BASE_URL}/resorts/blockresort/${id}`)
    }

    async function onSubmit(data) {
        console.log(data);
        const response = await axios.post(`${BASE_URL}/bookings/adminaddcoupon/`, data)
        console.log(response);
        if (response.data.msg === 200) {
            toast.success('Coupon Added')
            coupons();
            setAddToggle(!addToggle)
        } else {
            toast.error('Something went wrong')
        }
    };

    async function deleteCoupon(id) {
        const response = await axios.get(`${BASE_URL}/bookings/admindeletecoupon/${id}`)
        if(response.data.msg === 200){
            toast.success('Coupone deleted')
            coupons();
        }else {
            toast.error('Something went wrong')
        }
    }
    
    return (
        <div className='table-div'>
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div className="resort-table-header">
                <div style={{ display: 'flex', alignItems: "center", gap: "1.5rem" }}>
                    <h1 style={{ color: "black" }}>Coupons List</h1>
                    <button className='add-new-coupon-btn' onClick={() => setAddToggle(!addToggle)}>Add New Coupon</button>
                </div>
                <input className='allresort-search' type="text" placeholder='Search Resort'
                // onChange={e => handleSearch(e.target.value)}
                />
            </div>
            {addToggle && <div className="pop-update-adv">
                <div>
                    <div className='resort-name-toggle'>
                        <h2>Add New Coupon</h2>
                        <IoMdCloseCircle size={30} onClick={() => setAddToggle(!addToggle)} />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="add-coupon-form-container">
                        <div className="coupon-form-input-contain">
                            <label htmlFor="">Coupon Name</label>
                            <input className='coupon-form-input' type="text" name="coupon_name"
                                {...register('coupon_name')}
                            />
                        </div>
                        <div className="coupon-form-input-contain">
                            <label htmlFor="">Coupon Code</label>
                            <input className='coupon-form-input' type="text" name="code"
                                {...register('code')}
                            />
                        </div>
                        <div className="coupon-form-input-contain">
                            <label htmlFor="">Discount Amount</label>
                            <input className='coupon-form-input' type="number" name="discount_amount"
                                {...register('discount_amount')}
                            />
                        </div>
                        <div className="coupon-form-input-contain">
                            <label htmlFor="">Validity Date</label>
                            <input className='coupon-form-input' type="date" name="expiration_date"
                                {...register('expiration_date')}
                            />
                        </div>
                        <button className='add-coupon-form-btn' type='submit'>Add Coupon</button>
                    </div>
                </form>
            </div>}
            <div className="align-table">
                <table id="customers">
                    <tr>
                        <th>Coupon Name</th>
                        <th>Code</th>
                        <th>Valid To</th>
                        <th>Discount</th>
                        <th>Status</th>
                        <th className='action-col'>Actions</th>
                    </tr>
                    {allCoupons.map((coupon) => (
                        <tr>
                            <td className='all-resort-table-td'>{coupon.coupon_name}</td>
                            <td>{coupon.code}</td>
                            <td>{coupon.expiration_date}</td>
                            <td className='room_avail_col'>{coupon.discount_amount}</td>

                            {coupon.is_active ? (<td className='approved'>Approved</td>) : coupon.is_rejected ? (<td className='pending'>Rejected</td>) : (<td className='pending'>Pending</td>)}
                            <td className='action-col' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Switch style={{ backgroundColor: coupon.is_active ? 'green' : 'red' }} onChange={() => handleChange(coupon.id)} />
                                <DeleteIcon style={{color:"red"}} size={30} onClick={()=>deleteCoupon(coupon.id)} /></td>
                        </tr>
                    ))}

                </table>
            </div>

        </div>
    )
}

export default AllCoupons
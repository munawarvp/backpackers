import React from 'react'
import './customergallery.css'
import Review from '../../../images/background4.jpg'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { useEffect } from 'react'
import { useState } from 'react'

function CustomerGalley() {
    const [review_one, setReview_one] = useState({})
    const [review_two, setReview_two] = useState({})
    const [review_three, setReview_three] = useState({})

    const [review_four, setReview_four] = useState({})
    const [review_five, setReview_five] = useState({})

    useEffect(()=>{
        getReviewImages ();
    }, [])

    async function getReviewImages () {
        const response = await axios.get(`${BASE_URL}/bookings/getreviewimages`)
        const resort_review_one = response.data.resort[0]
        const resort_review_two = response.data.resort[1]
        const resort_review_three = response.data.resort[2]
        const adventure_one = response.data.adventure[0]
        const adventure_two = response.data.adventure[1]
        setReview_one(resort_review_one)
        setReview_two(resort_review_two)
        setReview_three(resort_review_three)
        setReview_four(adventure_one)
        setReview_five(adventure_two)
        console.log(resort_review_one);
        

    }
    return (
        <div id="recommend">
            <div className="gallery-heading-contain">
                <h1>Our Customer's Gallery</h1>
                <div className="gallery-img-collections">
                    <div className="galley-first-row">
                        <div className="gallery-img-container">
                            <img className='gallery-img' src={`${BASE_URL}/${review_one.review_image}`} alt="" />
                        </div>
                        <div className="gallery-img-first-row">
                            <div className="gallery-img-first-row-contain">
                                <img className='gallery-img' src={`${BASE_URL}/${review_two.review_image}`} alt="" />
                            </div>
                            <div className="gallery-img-first-row-contain">
                                <img className='gallery-img' src={`${BASE_URL}/${review_three.review_image}`} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="galley-first-row">
                        <div className="gallery-second-container">
                            <img className='gallery-img' src={`${BASE_URL}/${review_four.review_image}`} alt="" />
                        </div>
                        <div className="gallery-third-container">
                            <img className='gallery-img' src={`${BASE_URL}/${review_five.review_image}`} alt="" />
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default CustomerGalley
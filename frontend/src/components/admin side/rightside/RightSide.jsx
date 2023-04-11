import React from 'react'
import './rightside.css'
import Updates from './updates/Updates'
import CustomerReview from './review/CustomerReview'

function RightSide() {
  return (
    <div className="Rightside">
        <div>
            <h3>Updates</h3>
            <Updates/>
        </div>
        <div>
            <h3>Customer Reviews</h3>
            <CustomerReview/>
        </div>
    </div>
  )
}

export default RightSide
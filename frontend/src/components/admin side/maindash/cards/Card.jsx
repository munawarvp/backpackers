import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './cards.css'


function Card(props) {
    console.log('my', props);
  return (
    <div className="CompactCard"
        style={
            {background : props.color.backGround,boxShadow:props.color.boxShadow}
        }
    >
        <div className="radialBar">
            <CircularProgressbar value={props.barValue} text={`${props.barValue}%`} />
        </div>
        <div className="detail">
            <span>{props.value}</span>
            <span>{props.title}</span>
        </div>
    </div>
  )
}

export default Card
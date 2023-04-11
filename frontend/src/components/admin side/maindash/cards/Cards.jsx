import React from 'react'
import './cards.css'
import { CardsData } from '../../data/Data'
import Card from './Card'

function Cards() {
  return (
    <div className="Cards">
        {CardsData.map((item, index)=>{
            return(
                <div className="parentContainer">
                    <Card
                        title={item.title}
                        color={item.color}
                        barValue={item.barValue}
                        value={item.value}
                    />
                </div>
            )
        })}
    </div>
  )
}

export default Cards
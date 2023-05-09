import React from 'react'
import PageNot from '../../images/PageNotFound.gif'

function PageNotFound() {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <img src={PageNot} alt="" />
        {/* <h1>Not found</h1> */}
    </div>
  )
}

export default PageNotFound
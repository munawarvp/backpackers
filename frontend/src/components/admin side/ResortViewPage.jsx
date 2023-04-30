import React from 'react'
import Sidebar from './sidebar/Sidebar'
import ResortView from './maindash/resort view/ResortView'

function ResortViewPage() {
    return (
        <div className='resort-view-panel'>
            <div className="resort-view-glass">
                <Sidebar />
                <ResortView/>
            </div>
        </div>
    )
}

export default ResortViewPage
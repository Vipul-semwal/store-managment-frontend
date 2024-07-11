import React from 'react'
import './ButtonLoader.css'

function ButtonLoader() {
    return (
        <div className='btn-loader-wraper'>
            <div className="spinner center">
                {[...Array(12)].map((_, index) => (
                    <div className="spinner-blade" key={index}></div>
                ))}
            </div>

        </div>
    )
}

export default ButtonLoader

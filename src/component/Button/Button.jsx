import React from 'react'
import ButtonLoader from '../Global/Loader/ButtonLoader'
import './Button.css'

function Button({ onclick, loader, title }) {
    return (
        <button className='button' onClick={onclick} type="submit">
            {loader ? (<ButtonLoader />) : title}
        </button>
    )
}

export default Button

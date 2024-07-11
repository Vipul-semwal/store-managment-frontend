import { bottom } from '@popperjs/core'
import React from 'react'

function FormError({ message, style }) {
    console.log(message)
    return (
        <p className='error-para' style={style}>{message}</p>
    )
}

export default FormError

import React from 'react'

import { hashCode } from '../utils'
import './FormInput.scss'


function FormInput({ value, onChange, hint='', type='text' }) {
    const id = hashCode(value + hint + type + Math.random().toString())

    return (
        <input
            id={id}
            className='FormInput'
            type={type}
            placeholder={hint}
            value={value}
            onChange={onChange}
        />
    )
}

export default FormInput
import React from 'react'

import './FormField.scss'


function FormField({ label, input }) {
    return (
        <div className='FormField'>
            <label htmlFor={input.id} className='FormField__label'> { label } </label>
            {input}
        </div>
    )
}

export default FormField
import React from 'react'

import './Form.scss'

function Form({ title, fields }) {
    return (
        <form className='Form'>
            <p className='Form__title'>{ title }</p>
            <div className='Form__fields'>
                {fields}
            </div>
        </form>
    )
}

export default Form
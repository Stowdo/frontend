import React from 'react'

import './Form.scss'

function Form({ title, fields=[], buttons=[] }) {
    return (
        <form className='Form'>
            <p className='Form__title'>{ title }</p>
            {fields.length
            ?   <div className='Form__fields'>
                    {fields}
                </div>
            :   React.null
            }
            {buttons.length
            ?   <div className='Form__buttons'>
                    {buttons}
                </div>
            :   React.null
            }
        </form>
    )
}

export default Form
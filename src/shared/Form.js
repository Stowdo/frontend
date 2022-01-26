import React from 'react'

import './Form.scss'

function Form({ title, fields=[], sendButton, cancelButton, details }) {
    return (
        <form className='Form'>
            <p className='Form__title'>{ title }</p>
            {fields.length
            ?   <div className='Form__fields'>
                    {fields}
                </div>
            :   React.null
            }
            {details
            ?   <div className='Form__details'>
                    {details}
                </div>
            :   React.null
            }
            {sendButton || cancelButton
            ?   <div className='Form__buttons'>
                    {sendButton || React.null}
                    {cancelButton || React.null}
                </div>
            :   React.null
            }
        </form>
    )
}

export default Form
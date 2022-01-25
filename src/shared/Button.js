import React from 'react'

import './Button.scss'

function Button({ text, onClick, disabled=false, secondary=false }) {
    return (
        <button
            className={'Button'
                + (disabled ? ' Button--disabled' : '')
                + (secondary ? ' Button--secondary': '')
            }
            onClick={event => {
                if (!disabled) {
                    onClick(event)
                }
            }}>
            {text}
        </button>
    )
}

export default Button
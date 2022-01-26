import React from 'react'

import './Button.scss'

function Button({ children, onClick, disabled=false, secondary=false }) {
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
            {children}
        </button>
    )
}

export default Button
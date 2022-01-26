import React from 'react'

import Button from './Button'

import './ButtonWithIcon.scss'

function ButtonWithIcon({ children, onClick, icon, disabled=false, secondary=false }) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            secondary={secondary}
        >
            {children}
            <div className={'ButtonWithIcon__icon' + (secondary ? ' ButtonWithIcon__icon--secondary' : '')}>
                {icon}
            </div>
        </Button>
    )
}

export default ButtonWithIcon
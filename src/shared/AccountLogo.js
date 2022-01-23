import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../shapes/account.svg'

import './AccountLogo.scss'

function AccountLogo() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/settings')
    }

    return (
        <Logo className='AccountLogo' onClick={handleClick} />
    )
}

export default AccountLogo
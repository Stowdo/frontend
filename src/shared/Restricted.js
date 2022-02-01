import React from 'react'
import { Navigate } from 'react-router-dom'

import { getToken } from '../utils'


export default function Restricted({ children, next='/' }) {
    return (
        getToken()
        ?   <>{children}</>
        :   <Navigate to='/signin' state={{next: next}} />
    )
}
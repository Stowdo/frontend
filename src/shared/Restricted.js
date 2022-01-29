import React from 'react'
import { Navigate } from 'react-router-dom'

import { getToken } from '../utils'


export default function Restricted({ children }) {
    return (
        getToken()
        ?   <>{children}</>
        :   <Navigate to='/signin' />
    )
}
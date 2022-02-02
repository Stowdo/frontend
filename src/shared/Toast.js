import React from 'react'

import './Toast.scss'


export default function Toast({ message, onDestroy, timeout=3000 }) {
    React.useEffect(() => {
        setTimeout(onDestroy, timeout)
    }, [])

    return (
        <div className='Toast'>
            {message}
        </div>
    )
}
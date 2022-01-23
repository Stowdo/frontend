import React from 'react'

import AccountLogo from './AccountLogo'
import './StaticHeader.scss'

function StaticHeader() {
    return (
        <div className='StaticHeader'>
            <div className='StaticHeader__inner'>
                <div></div>
                <h1>Stowdo</h1>
                <AccountLogo width='40px' height='40px' fill='#ffffff'/>
            </div>
        </div>
    )
}

export default StaticHeader
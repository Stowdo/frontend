import React from 'react'

import AccountLogo from './AccountLogo'
import ActionBar from './ActionBar'
import './StaticHeader.scss'

function StaticHeader() {
    return (
        <div className='StaticHeader'>
            <div className='StaticHeader__inner'>
                <h1>Stowdo</h1>
                <div className='StaticHeader__actions'>
                    <ActionBar />
                    <AccountLogo className='StaticHeader__account' />
                </div>
            </div>
        </div>
    )
}

export default StaticHeader
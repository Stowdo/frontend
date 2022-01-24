import React from 'react'

import AccountLogo from './AccountLogo'
import ActionBar from './ActionBar'
import './StaticHeader.scss'

function StaticHeader(props) {
    return (
        <div className='StaticHeader'>
            <div className='StaticHeader__inner'>
                <h1>Stowdo</h1>
                {props.withActions || props.withSettings
                ?   <div className='StaticHeader__actions'>
                        {props.withActions
                        ?   <ActionBar />
                        :   React.null
                        }
                        {props.withSettings
                        ?   <AccountLogo className='StaticHeader__account' />
                        :   React.null
                        }
                    </div>
                :   React.null
                }
            </div>
        </div>
    )
}

export default StaticHeader
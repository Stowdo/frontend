import React from 'react'
import { useNavigate } from 'react-router-dom'

import ActionBar from './ActionBar'
import { ReactComponent as SettingsIcon } from '../shapes/settings.svg'
import { ReactComponent as CloseIcon } from '../shapes/close.svg'

import './StaticHeader.scss'

const defaultActions = {
    onDownload: () => {},
    onNewFolder: () => {},
    onRename: () => {},
    onCopy: () => {},
    onPaste: () => {},
    onDelete: () => {}
}


function StaticHeader({ actions=defaultActions, withActions=false, withSettings=false, withClose=false }) {
    const navigate = useNavigate()

    const handleSettingsClick = () => {
        navigate('/settings')
    }

    const handleCloseClick = () => {
        navigate('/')
    }

    return (
        <div className='StaticHeader'>
            <div className='StaticHeader__inner'>
                <a href='/'><h1>Stowdo</h1></a>
                {withActions || withSettings || withClose
                ?   <div className='StaticHeader__actions'>
                        {withActions
                        ?   <ActionBar {...actions} />
                        :   React.null
                        }
                        {withClose
                        ?   <CloseIcon
                                className='StaticHeader__icon'
                                onClick={handleCloseClick}
                            />
                        :   withSettings
                            ?   <SettingsIcon
                                    className='StaticHeader__icon'
                                    onClick={handleSettingsClick}
                                />
                            :       React.null
                        }
                    </div>
                :   React.null
                }
            </div>
        </div>
    )
}

export default StaticHeader
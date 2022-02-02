import React from 'react'

import { ReactComponent as TreeLogo } from '../shapes/tree.svg'
import { ReactComponent as RightArrow } from '../shapes/right.svg'

import './FileTree.scss'

function FileTree({ currentFolder }) {
    return (
        <div className='FileTree'>
            <div className='FileTree__inner'>
                <TreeLogo className='FileTree__icon' />
                <p className='FileTree__path'>My files</p>
                {currentFolder
                ?  currentFolder.parent_folder
                    ?   <>
                            <RightArrow className='FileTree__separator' />
                            <p>...</p>
                            <RightArrow className='FileTree__separator' />
                            <p className='FileTree__path'>{currentFolder.name}</p>
                        </>
                    :   <>
                            <RightArrow className='FileTree__separator' />
                            <p className='FileTree__path'>{currentFolder.name}</p>
                        </>
                :   React.null
                }
            </div>
        </div>
    )
}

export default FileTree
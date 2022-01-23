import React from 'react'

import { ReactComponent as TreeLogo } from '../shapes/tree.svg'
import { ReactComponent as RightArrow } from '../shapes/right.svg'

import './FileTree.scss'

function FileTree() {
    return (
        <div className='FileTree'>
            <div className='FileTree__inner'>
                <TreeLogo className='FileTree__icon' />
                <p className='FileTree__path'>My files</p>
                <RightArrow className='FileTree__separator' />
                <p className='FileTree__path'>School</p>
            </div>
        </div>
    )
}

export default FileTree
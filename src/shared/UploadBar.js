import React from 'react'

import { ReactComponent as UploadIcon } from '../shapes/upload.svg'

import './UploadBar.scss'


function UploadBar() {
    return (
        <div className='UploadBar__container'>
            <div className='UploadBar'>
                <p className='UploadBar__label'>Upload</p>
                <UploadIcon className='UploadBar__button' />
            </div>
        </div>
    )
}

export default UploadBar
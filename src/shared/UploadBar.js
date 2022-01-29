import React from 'react'

import { ReactComponent as UploadIcon } from '../shapes/upload.svg'

import './UploadBar.scss'


function UploadBar({ onUsed=() => {} }) {
    return (
        <label htmlFor='uploadfile' className='UploadBar__container' title='Upload'>
            <div className='UploadBar'>
                <p className='UploadBar__label'>Upload</p>
                <UploadIcon className='UploadBar__button' />
            </div>
            <input id='uploadfile' type='file' className='UploadBar__input' onChange={onUsed} />
        </label>
    )
}

export default UploadBar
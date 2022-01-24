import React from 'react'

import { ReactComponent as CopyIcon } from '../shapes/copy.svg'
import { ReactComponent as PasteIcon } from '../shapes/paste.svg'
import { ReactComponent as DownloadIcon } from '../shapes/download.svg'
import { ReactComponent as UploadIcon } from '../shapes/upload.svg'
import { ReactComponent as DeleteIcon } from '../shapes/delete.svg'
import { ReactComponent as NewFolderIcon } from '../shapes/new_folder.svg'
import { ReactComponent as RenameIcon } from '../shapes/rename.svg'

import './ActionBar.scss'


function ActionBar() {
    return (
        <div className='ActionBar'>
            <div className='ActionBar__side ActionBar__side--left'>
                <CopyIcon className='ActionBar__icon ActionBar__icon--side' title='Copy' />
                <PasteIcon className='ActionBar__icon ActionBar__icon--side' title='Paste' />
                <DownloadIcon className='ActionBar__icon ActionBar__icon--side' title='Download' />
            </div>
            <div className='ActionBar__central'>
                <UploadIcon className='ActionBar__icon ActionBar__icon--central' title='Upload' />
            </div>
            <div className='ActionBar__side ActionBar__side--right'>
                <DeleteIcon className='ActionBar__icon ActionBar__icon--side' title='Delete' />
                <NewFolderIcon className='ActionBar__icon ActionBar__icon--side' title='New folder' />
                <RenameIcon className='ActionBar__icon ActionBar__icon--side' title='Rename' />
            </div>
        </div>
    )
}

export default ActionBar
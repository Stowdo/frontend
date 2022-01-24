import React from 'react'

import { ReactComponent as CopyIcon } from '../shapes/copy.svg'
import { ReactComponent as PasteIcon } from '../shapes/paste.svg'
import { ReactComponent as DownloadIcon } from '../shapes/download.svg'
import { ReactComponent as DeleteIcon } from '../shapes/delete.svg'
import { ReactComponent as NewFolderIcon } from '../shapes/new_folder.svg'
import { ReactComponent as RenameIcon } from '../shapes/rename.svg'

import './ActionBar.scss'


function ActionBar() {
    return (
        <div className='ActionBar'>
            <DownloadIcon className='ActionBar__icon' title='Download' />
            <NewFolderIcon className='ActionBar__icon' title='New folder' />
            <RenameIcon className='ActionBar__icon' title='Rename' />
            <CopyIcon className='ActionBar__icon' title='Copy' />
            <PasteIcon className='ActionBar__icon' title='Paste' />
            <DeleteIcon className='ActionBar__icon' title='Delete' />
        </div>
    )
}

export default ActionBar
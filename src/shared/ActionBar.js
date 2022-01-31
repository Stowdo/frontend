import React from 'react'

import { ReactComponent as CopyIcon } from '../shapes/copy.svg'
import { ReactComponent as PasteIcon } from '../shapes/paste.svg'
import { ReactComponent as DownloadIcon } from '../shapes/download.svg'
import { ReactComponent as DeleteIcon } from '../shapes/delete.svg'
import { ReactComponent as NewFolderIcon } from '../shapes/new_folder.svg'
import { ReactComponent as RenameIcon } from '../shapes/rename.svg'

import './ActionBar.scss'


function ActionBar({ onDownload, onNewFolder, onRename, onCopy, onPaste, onDelete }) {
    return (
        <div className='ActionBar'>
            <DownloadIcon className='ActionBar__icon' title='Download' onClick={() => onDownload()} />
            <NewFolderIcon className='ActionBar__icon' title='New folder' onClick={() => onNewFolder()} />
            <RenameIcon className='ActionBar__icon' title='Rename' onClick={() => onRename()} />
            <CopyIcon className='ActionBar__icon' title='Copy' onClick={() => onCopy()} />
            <PasteIcon className='ActionBar__icon' title='Paste' onClick={() => onPaste()} />
            <DeleteIcon className='ActionBar__icon' title='Delete' onClick={() => onDelete()} />
        </div>
    )
}

export default ActionBar
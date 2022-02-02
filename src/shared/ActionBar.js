import React from 'react'

import { ReactComponent as CutIcon } from '../shapes/cut.svg'
import { ReactComponent as PasteIcon } from '../shapes/paste.svg'
import { ReactComponent as DownloadIcon } from '../shapes/download.svg'
import { ReactComponent as DeleteIcon } from '../shapes/delete.svg'
import { ReactComponent as NewFolderIcon } from '../shapes/new_folder.svg'
import { ReactComponent as RenameIcon } from '../shapes/rename.svg'

import './ActionBar.scss'


function ActionBar({
    onDownload,
    onNewFolder,
    onRename,
    onCut,
    onPaste,
    onDelete,
    disabled=false
}) {
    return (
        <div className={'ActionBar' + (disabled ? ' ActionBar--disabled' : '')}>
            <DownloadIcon className='ActionBar__icon' title='Download' onClick={() => {disabled || onDownload()}} />
            <NewFolderIcon className='ActionBar__icon' title='New folder' onClick={() => {disabled || onNewFolder()}} />
            <RenameIcon className='ActionBar__icon' title='Rename' onClick={() => {disabled || onRename()}} />
            <CutIcon className='ActionBar__icon' title='Cut' onClick={() => {disabled || onCut()}} />
            <PasteIcon className='ActionBar__icon' title='Paste' onClick={() => {disabled || onPaste()}} />
            <DeleteIcon className='ActionBar__icon' title='Delete' onClick={() => {disabled || onDelete()}} />
        </div>
    )
}

export default ActionBar
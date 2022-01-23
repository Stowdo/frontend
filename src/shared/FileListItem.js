import React from 'react'

import { ReactComponent as FolderIcon } from '../shapes/folder.svg'
import { ReactComponent as FileIcon } from '../shapes/file.svg'

import './FileListItem.scss'


function FileListItem(props) {
    return (
        <tr className='FileListItem'>
            <td className='FileListItem__icon'>
                {props.isFolder ? <FolderIcon /> : <FileIcon />}
            </td>
            <td className='FileListItem__text'>
                <p>{props.name}</p>
            </td>
            <td className='FileListItem__meta FileListItem__text'>
                <p>{props.size}</p>
            </td>
            <td className='FileListItem__meta FileListItem__text FileListItem__date'>
                <p>{props.date}</p>
            </td>
        </tr>
    )
}

export default FileListItem
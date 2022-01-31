import React from 'react'

import { ReactComponent as FolderIcon } from '../shapes/folder.svg'
import { ReactComponent as FileIcon } from '../shapes/file.svg'

import './FileListItem.scss'
import { humanDateTime, humanFileSize } from '../utils'


function FileListItem({ name, size, date, isFolder, onSelect, onOpen=() => {} }) {
    const [selected, select] = React.useState(false)

    const handleClick = () => {
        select(!selected)
        onSelect(!selected)
    }

    return (
        <tr
            className={'FileListItem' + (selected ? ' FileListItem__selected': '')}
            onClick={handleClick}
            onDoubleClick={onOpen}>
            <td className='FileListItem__icon'>
                {isFolder ? <FolderIcon /> : <FileIcon />}
            </td>
            <td className='FileListItem__text'>
                <p>{name}</p>
            </td>
            <td className='FileListItem__meta FileListItem__text'>
                <p>{humanFileSize(size)}</p>
            </td>
            <td className='FileListItem__meta FileListItem__text FileListItem__date'>
                <p>{humanDateTime(date)}</p>
            </td>
        </tr>
    )
}

export default FileListItem
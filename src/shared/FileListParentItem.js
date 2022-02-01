import React from 'react'

import { ReactComponent as UpIcon } from '../shapes/up.svg'

import './FileListItem.scss'


export default function FileListParentItem({ onOpen=() => {} }) {
    return (
        <tr
            className='FileListItem'
            onDoubleClick={onOpen}>
            <td className='FileListItem__icon'>
                <UpIcon />
            </td>
            <td className='FileListItem__text'>
                <p>Parent folder</p>
            </td>
            <td className='FileListItem__meta FileListItem__text'></td>
            <td className='FileListItem__meta FileListItem__text FileListItem__date'></td>
        </tr>
    )
}
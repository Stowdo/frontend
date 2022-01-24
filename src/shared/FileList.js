import React from 'react'

import FileListItem from './FileListItem'

import './FileList.scss'


function FileList(props) {
    return (
        <div className='FileList'>
            <table className='FileList__inner'>
                <tbody>
                    {props.files.map((file, index) => <FileListItem key={index} {...file} />)}
                </tbody>
            </table>
        </div>
    )
}

export default FileList
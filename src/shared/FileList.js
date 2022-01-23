import React from 'react'

import FileListItem from './FileListItem'

import './FileList.scss'


function FileList(props) {
    return (
        <div className='FileList'>
            <table className='FileList__inner'>
                {props.files.map((file, index) => <FileListItem key={index} {...file} />)}
            </table>
        </div>
    )
}

export default FileList
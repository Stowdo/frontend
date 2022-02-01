import React from 'react'

import FileListItem from './FileListItem'
import FileListParentItem from './FileListParentItem'

import './FileList.scss'


export default function FileList({ files, folders, onChangeDirectory, currentFolder=null }) {
    const handleSelectFolder = (id, selected) => {
        const folder = folders.find(folder => folder.id === id)
        folder.selected = selected
    }

    const handleSelectFile = (id, selected) => {
        const file = files.find(file => file.id === id)
        file.selected = selected
    }

    const handleOpen = id => {
        onChangeDirectory(id)
    }

    return (
        <div className='FileList'>
            <table className='FileList__inner'>
                <tbody>
                    {currentFolder
                    ?   <FileListParentItem onOpen={() => handleOpen(currentFolder.id)} />
                    :   React.null
                    }
                    {folders.map(folder => 
                        <FileListItem
                            key={folder.id}
                            name={folder.name}
                            size={folder.size}
                            date={folder.creation_date}
                            isFolder={true}
                            onSelect={selected => handleSelectFolder(folder.id, selected)}
                            onOpen={() => handleOpen(folder.id)}
                        />
                    )}
                    {files.map(file => 
                        <FileListItem
                            key={file.id}
                            name={file.name}
                            size={file.size}
                            date={file.upload_date}
                            isFolder={false}
                            onSelect={selected => handleSelectFile(file.id, selected)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}
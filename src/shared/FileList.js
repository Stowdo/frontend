import React from 'react'

import FileListItem from './FileListItem'
import FileListParentItem from './FileListParentItem'

import './FileList.scss'


export default function FileList({ files, folders, onChangeDirectory, currentFolder=null }) {
    const handleSelectFolder = (pk, selected) => {
        const folder = folders.find(folder => folder.pk === pk)
        folder.selected = selected
    }

    const handleSelectFile = (pk, selected) => {
        const file = files.find(file => file.pk === pk)
        file.selected = selected
    }

    const handleOpen = pk => {
        onChangeDirectory(pk)
    }

    return (
        <div className='FileList'>
            <table className='FileList__inner'>
                <tbody>
                    {currentFolder
                    ?   <FileListParentItem onOpen={() => handleOpen(currentFolder.pk)} />
                    :   React.null
                    }
                    {folders.map(folder => 
                        <FileListItem
                            key={folder.pk}
                            name={folder.name}
                            size={folder.size}
                            date={folder.creation_date}
                            isFolder={true}
                            onSelect={selected => handleSelectFolder(folder.pk, selected)}
                            onOpen={() => handleOpen(folder.pk)}
                        />
                    )}
                    {files.map(file => 
                        <FileListItem
                            key={file.pk}
                            name={file.name}
                            size={file.size}
                            date={file.upload_date}
                            isFolder={false}
                            onSelect={selected => handleSelectFile(file.pk, selected)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}
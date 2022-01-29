import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'
import FileList from '../shared/FileList'
import UploadBar from '../shared/UploadBar'

import { readFolders } from '../api/folder'
import { createFile, readFiles } from '../api/file'


export default function Home() {
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [path, setPath] = React.useState(null)

    const loadResources = async () => {
        setFolders(await readFolders(path))
        setFiles(await readFiles(path))
    }

    const handleUpload = async event => {
        await createFile(event.target.files[0])
    }

    React.useEffect(() => {
        loadResources()
    }, [])

    return (
        <div>
            <StaticHeader withActions={true} withSettings={true} />
            <FileTree />
            <FileList files={folders.concat(files)} />
            <UploadBar onUsed={handleUpload} />
        </div>
    )
}
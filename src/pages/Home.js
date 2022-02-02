import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'
import FileList from '../shared/FileList'
import UploadBar from '../shared/UploadBar'
import InputDialog from '../shared/InputDialog'

import { createFolder, deleteFolder, downloadFolder, downloadFolders, readFolders, updateFolder } from '../api/folder'
import { createFile, deleteFile, downloadFile, downloadFiles, readFiles, updateFile } from '../api/file'
import { downloadResources } from '../api/resource'

import './Home.scss'


function getSelectedResources(resources, selected=true) {
    return resources.filter(resource => resource.selected === selected)
}


export default function Home() {
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [currentFolder, setCurrentFolder] = React.useState(null)
    const [clipboard, setClipboard] = React.useState({
        files: [],
        folders: []
    })
    const [dialog, setDialog] = React.useState({
        opened: false,
        title: '',
        label: '',
        hint: '',
        defaultValue: '',
        onSubmit: () => {},
        onCancel: () => {}
    })

    const getCurrentFoderId = () => {
        return currentFolder?.id
    }

    const loadResources = async () => {
        const folderId = getCurrentFoderId()
        setFolders((await readFolders(folderId)).map(folder => {
            return {...folder, isFolder: true, selected: false}
        }))
        setFiles((await readFiles(folderId)).map(file => {
            return {...file, isFolder: false, selected: false}
        }))
    }

    const handleChangeDirectory = async folderPk => {
        setCurrentFolder(folderPk)
    }

    const handleUpload = async event => {
        await createFile(event.target.files[0], getCurrentFoderId() || '')
        loadResources()
    }

    const handleDownload = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        if (selectedFolders.length && selectedFiles.length) {
            await downloadResources(
                selectedFolders.map(folder => folder.id),
                selectedFiles.map(file => file.id),
            )
        } else if (selectedFolders.length) {
            if (selectedFolders.length === 1) {
                await downloadFolder(selectedFolders[0].id)
            } else {
                await downloadFolders(selectedFolders.map(folder => folder.id))
            }
        } else if (selectedFiles.length) {
            if (selectedFiles.length === 1) {
                await downloadFile(selectedFiles[0].id)
            } else {
                await downloadFiles(
                    selectedFiles.map(file => file.id),
                )
            }
        }
    }

    const handleNewFolder = async () => {
        setDialog({
            opened: true,
            title: 'Create a new folder',
            label: 'Folder name',
            hint: 'Type a folder name',
            defaultValue: '',
            onSubmit: async name => {
                await createFolder(name, getCurrentFoderId())
                await loadResources()
                setDialog({...dialog, opened: false})
            },
            onCancel: () => setDialog({...dialog, opened: false})
        })
    }

    const handleRename = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        if (selectedFolders.length + selectedFiles.length === 1) {
            if (selectedFolders.length) {
                setDialog({
                    opened: true,
                    title: 'Rename a folder',
                    label: 'Folder name',
                    hint: 'Type a new folder name',
                    defaultValue: '',
                    onSubmit: async name => {
                        await updateFolder(
                            selectedFolders[0].id,
                            name,
                            selectedFolders[0].deleted,
                            getCurrentFoderId(),
                        )
                        await loadResources()
                        setDialog({...dialog, opened: false})
                    },
                    onCancel: () => setDialog({...dialog, opened: false})
                })
            } else {
                setDialog({
                    opened: true,
                    title: 'Rename a file',
                    label: 'File name',
                    hint: 'Type a new file name',
                    defaultValue: '',
                    onSubmit: async name => {
                        await updateFile(
                            selectedFiles[0].id,
                            name,
                            selectedFiles[0].deleted,
                            getCurrentFoderId(),
                        )
                        await loadResources()
                        setDialog({...dialog, opened: false})
                    },
                    onCancel: () => setDialog({...dialog, opened: false})
                })
            }
        }
    }

    const handleCut = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)
        setClipboard({
            folders: selectedFolders,
            files: selectedFiles,
        })
    }

    const handlePaste = async () => {
        clipboard.folders.forEach(async folder => await updateFolder(
            folder.id,
            folder.name,
            folder.deleted,
            getCurrentFoderId(),
        ))
        clipboard.files.forEach(async file => await updateFile(
            file.id,
            file.name,
            file.deleted,
            getCurrentFoderId(),
        ))
        await loadResources()
    }

    const handleDelete = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        selectedFolders.forEach(async folder => await deleteFolder(folder.id))
        selectedFiles.forEach(async file => await deleteFile(file.id))
        
        setFolders(getSelectedResources(folders, false))
        setFiles(getSelectedResources(files, false))
    }

    const actions = {
        onDownload: handleDownload,
        onNewFolder: handleNewFolder,
        onRename: handleRename,
        onCut: handleCut,
        onPaste: handlePaste,
        onDelete: handleDelete
    }

    React.useEffect(() => {
        loadResources()
    }, [currentFolder])

    return (
        <div className={'Home' + (dialog.opened ? ' Home--blur' : '')}>
            <StaticHeader
                actions={actions}
                withActions={true}
                withSettings={true}
                disabled={dialog.opened}
            />
            <FileTree currentFolder={currentFolder} />
            <FileList
                folders={folders}
                files={files}
                onChangeDirectory={handleChangeDirectory}
                currentFolder={currentFolder}
            />
            <UploadBar onUsed={handleUpload} disabled={dialog.opened} />
            {dialog.opened
            ?   <InputDialog
                    title={dialog.title}
                    label={dialog.label}
                    hint={dialog.hint}
                    defaultValue={dialog.defaultValue}
                    onSubmit={dialog.onSubmit}
                    onCancel={dialog.onCancel}
                />
            :   React.null
            }
        </div>
    )
}
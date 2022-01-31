import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'
import FileList from '../shared/FileList'
import UploadBar from '../shared/UploadBar'
import InputDialog from '../shared/InputDialog'

import { createFolder, deleteFolder, readFolders, updateFolder } from '../api/folder'
import { createFile, deleteFile, downloadFile, readFiles, updateFile } from '../api/file'
import { downloadResources } from '../api/resource'


function getSelectedResources(resources, selected=true) {
    return resources.filter(resource => resource.selected === selected)
}


export default function Home() {
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [currentFolder, setCurrentFolder] = React.useState(null)
    const [newFolderDialog, openNewFolderDialog] = React.useState(false)
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

    const loadResources = async () => {
        setFolders((await readFolders(currentFolder)).map(folder => {
            return {...folder, isFolder: true, selected: false}
        }))
        setFiles((await readFiles(currentFolder)).map(file => {
            return {...file, isFolder: false, selected: false}
        }))
    }

    const handleChangeDirectory = async folderPk => {
        setCurrentFolder(folderPk)
    }

    const handleUpload = async event => {
        await createFile(event.target.files[0], currentFolder || '')
        loadResources()
    }

    const handleDownload = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        if (selectedFolders.length || selectedFiles.length > 1) {
            await downloadResources(
                selectedFolders.map(folder => folder.pk),
                selectedFiles.map(file => file.pk)
            )
        } else {
            await downloadFile(selectedFiles[0].pk)
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
                await createFolder(name, currentFolder)
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
                            selectedFolders[0].pk,
                            name,
                            selectedFolders[0].deleted,
                            currentFolder
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
                            selectedFiles[0].pk,
                            name,
                            selectedFiles[0].deleted,
                            currentFolder
                        )
                        await loadResources()
                        setDialog({...dialog, opened: false})
                    },
                    onCancel: () => setDialog({...dialog, opened: false})
                })
            }
        }
    }

    const handleCopy = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)
        setClipboard({
            folders: selectedFolders.map(folder => folder.pk),
            files: selectedFiles.map(file => file.pk)
        })
    }

    const handlePaste = async () => {
        clipboard.folders.forEach(async folder => await updateFolder(
            folder.pk,
            folder.name,
            folder.deleted,
            currentFolder
        ))
        clipboard.files.forEach(async file => await updateFile(
            file.pk,
            file.name,
            file.deleted,
            currentFolder
        ))
    }

    const handleDelete = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        selectedFolders.forEach(async folder => await deleteFolder(folder.pk))
        selectedFiles.forEach(async file => await deleteFile(file.pk))
        
        setFolders(getSelectedResources(folders, false))
        setFiles(getSelectedResources(files, false))
    }

    const actions = {
        onDownload: handleDownload,
        onNewFolder: handleNewFolder,
        onRename: handleRename,
        onCopy: handleCopy,
        onPaste: handlePaste,
        onDelete: handleDelete
    }

    React.useEffect(() => {
        loadResources()
    }, [currentFolder])

    return (
        <div>
            <StaticHeader actions={actions} withActions={true} withSettings={true} />
            <FileTree />
            <FileList
                folders={folders}
                files={files}
                onChangeDirectory={handleChangeDirectory}
            />
            <UploadBar onUsed={handleUpload} />
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
import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'
import FileList from '../shared/FileList'
import UploadBar from '../shared/UploadBar'
import InputDialog from '../shared/InputDialog'
import Toast from '../shared/Toast'

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
    const [toast, setToast] = React.useState({
        opened: false,
        message: '',
    })

    const getCurrentFoderId = () => {
        return currentFolder?.id
    }

    const loadResources = async () => {
        const folderId = getCurrentFoderId()

        try {
            setFolders((await readFolders(folderId)).map(folder => {
                return {...folder, isFolder: true, selected: false}
            }))
            setFiles((await readFiles(folderId)).map(file => {
                return {...file, isFolder: false, selected: false}
            }))
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to load your files'
            })
        }
    }

    const handleChangeDirectory = async folderPk => {
        setCurrentFolder(folderPk)
    }

    const handleUpload = async event => {
        try {
            await createFile(event.target.files[0], getCurrentFoderId() || '')
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to upload this file'
            })
        }
        loadResources()
    }

    const handleDownload = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        try {
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
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to download resources'
            })
        }
    }

    const handleNewFolder = async () => {
        try {
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
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to create a new folder'
            })
        }
    }

    const handleRename = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        try {
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
            } else {
                setToast({
                    opened: true,
                    message: 'You can only rename one resource at a time'
                })
            }
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to rename this resource'
            })
        }
    }

    const handleCut = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)
        setClipboard({
            folders: selectedFolders,
            files: selectedFiles,
        })
        setToast({
            opened: true,
            message: 'Resources cut'
        })
    }

    const handlePaste = async () => {
        try {
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
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to move these resources'
            })
        }
        await loadResources()
    }

    const handleDelete = async () => {
        const selectedFolders = getSelectedResources(folders)
        const selectedFiles = getSelectedResources(files)

        try {
            selectedFolders.forEach(async folder => await deleteFolder(folder.id))
            selectedFiles.forEach(async file => await deleteFile(file.id))
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to delete theses resources'
            })
        }
        
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
            {toast.opened
            ?   <Toast message={toast.message} onDestroy={() => setToast({...toast, opened: false})} />
            :   React.null
            }
        </div>
    )
}
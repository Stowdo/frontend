import { api_url, downloadEndpoint, getEndpoint, updateEndpoint } from '../utils'

// list
export async function readFolders(parent_folder='') {
    parent_folder = parent_folder || ''
    const url = api_url + `/storage/folders/?parent_folder=${parent_folder}`
    return await getEndpoint(url)
}

// details
export async function createFolder(name, parent_folder) {
    const url = api_url + '/storage/folders/'
    const body = { name: name, parent_folder: parent_folder }
    return await updateEndpoint(url, 'post', body)
}


export async function readFolder(pk) {
    const url = api_url + `/storage/folder/${pk}/`
    return await getEndpoint(url)
}

export async function updateFolder(pk, name, deleted, parent_folder) {
    const url = api_url + `/storage/folders/${pk}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    return await updateEndpoint(url, 'put', body)
}

export async function deleteFolder(pk) {
    const url = api_url + `/storage/folders/${pk}/`
    return await updateEndpoint(url, 'delete', {})
}

// download
export async function downloadFolder(pk) {
    const url = api_url + `/storage/folders/${pk}/download/`
    await downloadEndpoint(url, 'get', {})
}

export async function downloadFolders(pks) {
    const url = api_url + '/storage/folders/download/'
    const body = { folders: pks }
    await downloadEndpoint(url, 'post', body)
}
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


export async function readFolder(id) {
    const url = api_url + `/storage/folder/${id}/`
    return await getEndpoint(url)
}

export async function updateFolder(id, name, deleted, parent_folder) {
    const url = api_url + `/storage/folders/${id}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    return await updateEndpoint(url, 'patch', body)
}

export async function deleteFolder(id) {
    const url = api_url + `/storage/folders/${id}/`
    return await updateEndpoint(url, 'delete', {})
}

// download
export async function downloadFolder(id) {
    const url = api_url + `/storage/folders/${id}/download/`
    await downloadEndpoint(url, 'get', {})
}

export async function downloadFolders(ids) {
    const url = api_url + '/storage/folders/download/'
    const body = { folders: ids }
    await downloadEndpoint(url, 'post', body)
}
import { apiUrl, downloadEndpoint, getEndpoint, updateEndpoint } from '../utils'

// list
export async function readFiles(parent_folder = null) {
    parent_folder = parent_folder || ''
    const url = apiUrl + `/files/?parent_folder=${parent_folder}`
    return await getEndpoint(url)
}

// details
export async function createFile(file, parent_folder) {
    const url = apiUrl + '/files/'
    const body = new FormData()

    body.append('path', file)
    body.append('parent_folder', parent_folder)

    return await updateEndpoint(url, 'post', body)
}


export async function readFile(id) {
    const url = apiUrl + `/file/${id}/`
    return await getEndpoint(url)
}


export async function updateFile(id, name, deleted, parent_folder) {
    const url = apiUrl + `/files/${id}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    return await updateEndpoint(url, 'patch', body)
}

export async function deleteFile(id) {
    const url = apiUrl + `/files/${id}/`
    return await updateEndpoint(url, 'delete', {})
}

// download
export async function downloadFile(id) {
    const url = apiUrl + `/files/${id}/download/`
    await downloadEndpoint(url, 'get', {})
}

export async function downloadFiles(ids) {
    const url = apiUrl + '/files/download/'
    const body = { files: ids }
    await downloadEndpoint(url, 'post', body)
}
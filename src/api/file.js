import { api_url, getEndpoint, updateEndpoint } from '../utils'

// list
export async function readFiles(parent_folder='') {
    const url = api_url + '/storage/files/'
    return await getEndpoint(url)
}

// details
export async function createFile(file, parent_folder) {
    const url = api_url + '/storage/files/'
    const body = new FormData()
    
    body.append('path', file)
    body.append('parent_folder', parent_folder)
    
    return await updateEndpoint(url, 'post', body)
}


export async function readFile(pk) {
    const url = api_url + `/storage/file/${pk}/`
    return await getEndpoint(url)
}


export async function updateFile(pk, name, deleted, parent_folder) {
    const url = api_url + `/storage/files/${pk}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    return await updateEndpoint(url, 'put', body)
}

export async function deleteFile(pk) {
    const url = api_url + `/storage/files/${pk}/`
    return await updateEndpoint(url, 'delete', {})
}

// download
export async function downloadFile(pk) {
    const url = api_url + `/storage/files/${pk}/download`
    return await getEndpoint(url)
}
import { api_url, getEndpoint, updateEndpoint } from '../utils'

// list
export async function readFolders(parent_folder='') {
    const url = api_url + '/storage/folders/'
    return await getEndpoint(url)
}

// details
export async function createFolder(name, parent_folder) {
    const url = api_url + '/storage/files/'
    const body = { name: name, parent_folder: parent_folder }
    return await getEndpoint(url, 'post', body)
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
    const url = api_url + `/storage/folder/${pk}/`
    return await updateEndpoint(url, 'delete', {})
}
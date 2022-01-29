import axios from 'axios'
import { api_url } from "../utils";

// list
export async function readFolders(parent_folder='') {
    const url = api_url + '/storage/folders/'
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}

// details
export async function createFolder(name, parent_folder=null) {
    const url = api_url + '/storage/files/'
    const body = { name: name, parent_folder: parent_folder }
    const response = await axios.post(url, body, { withCredentials: true })
    return response.data
}


export async function readFolder(pk) {
    const url = api_url + `/storage/folder/${pk}/`
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}


export async function updateFolder(pk, name, deleted, parent_folder) {
    const url = api_url + `/storage/folders/${pk}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    const response = await axios.put(url, body, { withCredentials: true })
    return response.data
}
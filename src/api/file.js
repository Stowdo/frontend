import axios from 'axios'
import { api_url } from "../utils";

// list
export async function readFiles(parent_folder='') {
    const url = api_url + '/storage/files/'
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}

// details
export async function createFile(file, parent_folder=null) {
    const url = api_url + '/storage/files/'
    const body = new FormData()
    body.append('path', file)
    body.append('parent_folder', parent_folder)
    const config = {
        withCredentials: true,
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    const response = await axios.post(url, body, config)
    return response.data
}


export async function readFile(pk) {
    const url = api_url + `/storage/file/${pk}/`
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}


export async function updateFile(pk, name, deleted, parent_folder) {
    const url = api_url + `/storage/files/${pk}/`
    const body = {
        name: name,
        deleted: deleted,
        parent_folder: parent_folder
    }
    const response = await axios.put(url, body, { withCredentials: true })
    return response.data
}
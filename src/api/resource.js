import { api_url, updateEndpoint } from '../utils'


export async function downloadResources(folders_pk, files_pk) {
    const url = api_url + '/storage/resources/download'
    const body = {
        folders: folders_pk,
        files: files_pk
    }
    return await updateEndpoint(url, 'post', body)
}
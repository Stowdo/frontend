import { api_url, downloadEndpoint } from '../utils'


// download
export async function downloadResources(folders_pk, files_pk) {
    const url = api_url + '/storage/resources/download/'
    const body = {
        folders: folders_pk,
        files: files_pk,
    }
    await downloadEndpoint(url, 'post', body)
}
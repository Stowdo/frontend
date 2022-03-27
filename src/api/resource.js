import { apiUrl, downloadEndpoint } from '../utils'


// download
export async function downloadResources(folders_pk, files_pk) {
    const url = apiUrl + '/resources/download/'
    const body = {
        folders: folders_pk,
        files: files_pk,
    }
    await downloadEndpoint(url, 'post', body)
}
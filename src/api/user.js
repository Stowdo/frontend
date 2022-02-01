import { api_url, getEndpoint, updateEndpoint } from '../utils'


export async function readUser() {
    const url = api_url + '/auth/user/'
    return await getEndpoint(url)
}

export async function updateUser(username=null, firstname=null, lastname=null) {
    const url = api_url + '/auth/user/'
    let body = {}

    if (username !== null) {
        body.username = username
    }
    if (firstname !== null) {
        body.firstname = firstname
    }
    if (lastname !== null) {
        body.lastname = lastname
    }

    return await updateEndpoint(url, 'put', body)
}
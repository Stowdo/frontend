import { api_url, updateEndpoint } from '../utils'


export async function signin(username, password) {
    const url = api_url + '/auth/login/'
    const body = { username: username, password: password }
    return await updateEndpoint(url, 'post', body)
}

export async function signup(username, email, password1, password2) {
    const url = api_url + '/auth/register/'
    const body = {
        username: username,
        email: email,
        password1: password1,
        password2: password2
    }
    return await updateEndpoint(url, 'post', body)
}

export async function signout() {
    const url = api_url + '/auth/logout/'
    return await updateEndpoint(url, 'post', {})
}
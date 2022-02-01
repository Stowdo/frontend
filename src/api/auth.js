import { api_url, getEndpoint, updateEndpoint } from '../utils'


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

export async function getConnectedUser() {
    const url = api_url + '/auth/user/'
    return await getEndpoint(url)
}

export async function changePassword(newPassword1, newPassword2, oldPassword) {
    const url = api_url + '/auth/password/change/'
    const body = {
        new_password1: newPassword1,
        new_password2: newPassword2,
        old_password: oldPassword,
    }
    return await updateEndpoint(url, 'post', body)
}
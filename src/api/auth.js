import { apiUrl, getEndpoint, updateEndpoint } from '../utils'


export async function signin(username, password) {
    const url = apiUrl + '/auth/login/'
    const body = { username: username, password: password }
    return await updateEndpoint(url, 'post', body)
}

export async function signup(username, email, password1, password2) {
    const url = apiUrl + '/auth/register/'
    const body = {
        username: username,
        email: email,
        password1: password1,
        password2: password2
    }
    return await updateEndpoint(url, 'post', body)
}

export async function signout() {
    const url = apiUrl + '/auth/logout/'
    return await updateEndpoint(url, 'post', {})
}

export async function getConnectedUser() {
    const url = apiUrl + '/auth/user/'
    return await getEndpoint(url)
}

export async function changePassword(newPassword1, newPassword2, oldPassword) {
    const url = apiUrl + '/auth/password/change/'
    const body = {
        new_password1: newPassword1,
        new_password2: newPassword2,
        old_password: oldPassword,
    }
    return await updateEndpoint(url, 'post', body)
}
import { api_url, getEndpoint, updateEndpoint } from '../utils'


// auth
export async function loginUser(username, password, csrfToken) {
    const url = api_url + '/auth/login/'
    const body = { username: username, password: password }
    return await updateEndpoint(url, 'post', body, csrfToken)
}

export async function registerUser(username, email, password1, password2, csrfToken) {
    const url = api_url + '/auth/register/'
    const body = {
        username: username,
        email: email,
        password1: password1,
        password2: password2
    }
    return await updateEndpoint(url, 'post', body, csrfToken)
}

// CRUD
export async function readUser() {
    const url = api_url + '/auth/user/'
    return await getEndpoint(url)
}

export async function updateUser(username, firstname, lastname, csrfToken) {
    const url = api_url + '/'
    const body = {
        username: username,
        first_name: firstname,
        last_name: lastname
    }
    return await updateEndpoint(url, 'post', body, csrfToken)
}
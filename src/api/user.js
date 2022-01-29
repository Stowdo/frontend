import axios from 'axios'
import { api_url } from '../utils'


// auth
export async function loginUser(username, password) {
    const url = api_url + '/auth/login/'
    const body = { username: username, password: password }
    const response = await axios.post(url, body)
    return response.data
}


export async function registerUser(username, email, password1, password2) {
    const url = api_url + '/auth/register/'
    const body = {
        username: username,
        email: email,
        password1: password1,
        password2: password2
    }
    const response = await axios.post(url, body, { withCredentials: true })
    return response.data
}


// CRUD
export async function readUser() {
    const url = api_url + '/auth/user/'
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}


export async function updateUser(username, firstname, lastname) {
    const url = api_url + '/'
    const body = {
        username: username,
        first_name: firstname,
        last_name: lastname
    }
    const response = await axios.put(url, body, { withCredentials: true })
    return response.data
}
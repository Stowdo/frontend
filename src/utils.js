import axios from 'axios'
import Cookies from 'js-cookie'

const api_protocol = process.env.REACT_APP_STOWDO_API_PROTOCOL
const api_host = process.env.REACT_APP_STOWDO_API_HOST
const api_port = process.env.REACT_APP_STOWDO_API_PORT
export const api_url = `${api_protocol}://${api_host}:${api_port}`


export function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

// token
export function setToken(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
}

export function getToken() {
    const rawToken = sessionStorage.getItem('token')
    const token = JSON.parse(rawToken)
    return token?.key
}

// requests
export async function getEndpoint(url) {
    const response = await axios({
        method: 'get',
        url: url,
        withCredentials: true
    })
    return response.data
}

export async function updateEndpoint(url, method, body) {
    const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
    })
    return response.data
}

export async function downloadEndpoint(url, method, body) {
    let request = {
        method: method,
        url: url,
        data: body,
        responseType: 'blob',
        withCredentials: true
    }
    
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
        request.headers = {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const response = await axios(request)
    const dispositions = response.headers['content-disposition']
        .split(/\s*;\s*/)
        .reduce((obj, disposition) => {
            const [key, value] = disposition.split('=')
            obj[key] = (typeof value === 'string' ? value.replace(/['"]+/g, '') : value)
            return obj
        },
        {})
    const filename = dispositions['filename']
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')

    link.href = downloadUrl
    link.setAttribute('download', filename)
    link.click()
}
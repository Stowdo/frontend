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
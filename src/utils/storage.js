/**
 * token存取
 */
const TokenKey = 'token'

export function getToken () {
  return localStorage.getItem(TokenKey) || ''
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token || '')
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

/**
 * userInfo存取
 */
const UserKey = 'userInfo'

export function getUser () {
  return JSON.parse(localStorage.getItem(UserKey) || '{}')
}

export function setUser (obj) {
  return localStorage.setItem(UserKey, JSON.stringify(obj || {}))
}

export function removeUser () {
  return localStorage.removeItem(UserKey)
}

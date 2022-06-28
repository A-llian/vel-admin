import Cookies from 'js-cookie'

const TokenKey = 'adminToken'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
}

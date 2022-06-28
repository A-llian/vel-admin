import { defineStore } from 'pinia'
import { getToken, setToken } from '@/utils/auth'
import { FormType } from '@/views/login/type'

const userStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: getToken()
    }
  },
  getters: {

  },
  actions: {
    Login(userInfo: FormType) {
      const { username, password } = userInfo
      return new Promise<void>((resolve) => {
        // login({ username: username.trim(), password: password })
        //   .then((response) => {
        //     commit('SET_TOKEN', response.token)
        //     setToken(response.token)
        //     setUserName(username)
        //     setPsd(password)
        //     resolve()
        //   }).catch((error) => {
        //   reject(error)
        // })
        setToken(`${username}${password}`)
        resolve()
      })
    },
  }
})

export {
  userStore
}
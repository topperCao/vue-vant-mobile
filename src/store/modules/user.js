import { getToken, getUser, setToken, setUser } from '@/utils/storage.js'

export default {
  state: {
    userInfo: {},
    token: ''
  },

  getters: {
    userInfo: state => JSON.stringify(state.userInfo) === '{}' ? getUser() : state.userInfo,
    token: state => state.token || getToken()
  },

  mutations: {
    setUserName (state, userInfo) {
      setUser(userInfo)
      state.userInfo = userInfo || {}
    },
    setToken (state, token) {
      setToken(token)
      state.token = token || ''
    }
  },

  actions: {

  }
}

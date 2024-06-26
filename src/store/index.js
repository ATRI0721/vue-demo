import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    userid : 0,
    loginstatus : false,
    url : 'http://localhost:8080'
  },
  getters: {
    getUserName: state => state.username,
    getUserId: state => state.userid,
    getLoginStatus: state => state.loginstatus,
    getUrl: state => state.url
  },
  mutations: {
    setUserName(state, username) {
      state.username = username
    },
    setUserId(state, userid) {
      state.userid = userid
    },
    setLoginStatus(state, loginstatus) {
      state.loginstatus = loginstatus
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    // 获取token属性值，封装为store里的计算属性
    token (state) {
      return state.user.userInfo.token
    },
    // 获取用户邮箱
    email (state) {
      return state.user.userInfo.email
    },
    // 获取isLoading的值
    isLoading (state) {
      return state.loading.isLoading
    }
  },
  mutations: {
    // 直接修改loading.js里的isLoading值
    setLoading (state, load) {
      state.loading.isLoading = load
    }
  },
  actions: {
  },
  modules: {
    user,
    loading
  }
})

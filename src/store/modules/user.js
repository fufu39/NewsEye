// 用户信息模块
// 引入存储、获取个人信息的方法
import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo() // 获取个人信息，保存到state的userInfo里面
    }
  },
  getters: {},
  mutations: {
    // 存储个人信息（传入obj），并对state里的userInfo更新
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {}
}

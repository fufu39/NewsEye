// 创建axios实例，对创建出来的实例进行自定义配置，这样不会污染原始的axios实例（此后导入request当作axios使用即可）
import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://192.168.1.102:8080', // 基地址
  timeout: 0 // 关闭超时取消
})

// 请求拦截器：发送请求之前执行
instance.interceptors.request.use(function (config) {
  // 开启loading
  store.commit('setLoading', true)

  // 携带请求头
  const token = store.getters.token // 如果无token得到的是空字符串
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // 设置请求头的Authorization
    config.headers['Content-Type'] = 'multipart/form-data' // 设置请求头的Content-Type
  }

  return config
}, function (error) {
  store.commit('setLoading', false)
  // 错误处理
  return Promise.reject(error)
})

// 响应拦截器：再返回响应前做什么
instance.interceptors.response.use(function (response) {
  // 关闭loading
  store.commit('setLoading', false)

  // 成功，200状态码会触发该函数。
  const res = response.data
  if (response.status !== 200) {
    // Toast(res.message)
    alert(res.msg)
    return Promise.reject(res.msg)
  } else {
    // Toast.clear()不执行任何操作
  }
  return response
}, function (error) {
  store.commit('setLoading', false)
  // 错误，不是200状态码触发
  return Promise.reject(error)
})

export default instance

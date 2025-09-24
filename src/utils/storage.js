// 为store模块提供一些存储、获取信息函数

// 个人信息，包括token
const USER = 'user_info'
// 存储个人信息
export const setInfo = (obj) => {
  localStorage.setItem(USER, JSON.stringify(obj))
}
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', email: '' } // 在无本地存储时提供空对象
  const result = localStorage.getItem(USER)
  return result ? JSON.parse(result) : defaultObj
}
// 移除个人信息（暂不使用）
export const removeInfo = () => {
  localStorage.removeItem(USER)
}

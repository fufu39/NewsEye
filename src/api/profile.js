// 获取、更新个人信息的接口请求
import request from '@/utils/request'

// 获取用户个人信息
export const getInfo = (email) => {
  return request.get('/api/user/getInfo', {
    params: {
      email
    }
  })
}

// 更新用户个人信息
export const updateInfo = (userInfo) => {
  return request.post('/api/user/update', userInfo)
}

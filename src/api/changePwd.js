// 修改密码的接口请求
import request from '@/utils/request'

// 提交修改密码请求
export const submitChangePwd = (email, pwd) => {
  return request.get('/api/user/reset', {
    params: {
      email,
      pwd
    }
  })
}

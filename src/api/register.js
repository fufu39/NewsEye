// 注册的接口请求
import request from '@/utils/request'

// 获取验证码：get方法，参数为email
export const getVerifyCode = (email) => {
  return request.get('/api/sendCode', {
    params: {
      email
    }
  })
}

// 检验验证码
export const validateVerifyCode = (email, code) => {
  return request.get('/api/verifyCode', {
    params: {
      email,
      code
    }
  })
}

// 注册
export const registerUser = (email, pwd) => {
  return request.get('/api/user/register', {
    params: {
      email,
      pwd
    }
  })
}

// 登录的接口请求
import request from '@/utils/request'

// 密码登录
export const loginWithPassword = (email, pwd) => {
  return request.get('/api/user/login', {
    params: {
      email,
      pwd
    }
  })
}

// 前提是加个切换选项，切换密码栏为验证码栏，然后获取验证码+检验验证码（先放着）
// 验证码登录（同register.js检验验证码接口）
export const loginWithVerifyCode = (email, code) => {
  return request.get('/api/verifyCode', {
    params: {
      email,
      code
    }
  })
}

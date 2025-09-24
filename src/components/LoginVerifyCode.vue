<!-- login页发送验证码按钮(导入LoginComponent) -->
<template>
  <button
  class="bttn-bordered bttn-sm bttn-primary"
  @click="sendVerifyCode"
  :disabled="isDisabled">
    {{ isDisabled ? `${countdown}s后重试` : '发送验证码' }}
  </button>
</template>

<script>
// 引入bttn.css的基础样式
import '@/styles/bttn.css'
import store from '@/store'
// 引入请求方法：获取验证码
import { getVerifyCode } from '@/api/register'
export default {
  name: 'LoginVerifyCode',
  data () {
    return {
      isDisabled: false, // 控制按钮禁用
      countdown: 60 // 倒计时时间
    }
  },
  props: {
    email: {
      type: String,
      default: store.getters.email
    }
  },
  methods: {
    // 获取验证码：无返回值，邮箱显示
    async sendVerifyCode () {
      // 对邮箱判断非空
      if (!this.email) {
        this.$message({
          duration: 700,
          message: '请输入邮箱',
          type: 'error',
          center: true,
          offset: 160,
          customClass: 'custom-message'
        })
        return
      }
      this.startCountdown()
      // 调用接口，获取验证码
      const res = await getVerifyCode(this.email)
      if (res.status === 200) {
        this.$message({
          duration: 700,
          message: '获取验证码成功~',
          type: 'success',
          center: true,
          offset: 160,
          customClass: 'custom-message'
        })
      } else {
        this.$message({
          duration: 700,
          message: '获取验证码失败~',
          type: 'error',
          center: true,
          offset: 160,
          customClass: 'custom-message'
        })
      }
    },

    // 倒计时60s并禁用点击
    startCountdown () {
      if (this.isDisabled) return // 避免重复点击
      this.isDisabled = true
      this.countdown = 60
      const timer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(timer)
          this.isDisabled = false
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
button.bttn-bordered{
  /* 不算border、margin是84*28 */
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(0,0,0,0.8);
  border-radius: 4px;
  border-width: 1.5px;
  border-color: rgba(0,0,0,0.7);
  transition: all 0.3s;
}
button.bttn-bordered:hover{
  border-color: rgba(0,0,0,0.7);
  box-shadow: 2px 2px rgba(0,0,0,0.7);
}
button.bttn-bordered:focus{
  border-color: rgba(0,0,0,0.7);
}
button.bttn-bordered:active{
  transform: scale(0.97);
}
</style>

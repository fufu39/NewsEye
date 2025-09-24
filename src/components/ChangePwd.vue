<template>
  <div class="changePwd" :style="{ backgroundColor: bgColor }">
    <div class="form-item">
      <label for="email_changePwd">邮箱</label>
      <input type="email" id="email_changePwd" name="email_changePwd" v-model="email">
    </div>
    <div class="form-item verify">
      <label for="pwd_old">验证码</label>
      <input type="text" id="pwd_old" name="pwd_old" v-model="pwd_old">
      <LoginVerifyCode class="verify_btn" :email="email"></LoginVerifyCode>
    </div>
    <div class="form-item">
      <label for="pwd">密码</label>
      <input type="password" id="pwd" name="pwd" v-model="pwd">
    </div>
    <div class="form-item">
      <label for="pwd_again">请重复</label>
      <input type="password" id="pwd_again" name="pwd_again" v-model="pwd_again">
    </div>
    <div class="buttons">
      <button class="submit-btn" @click="submitPwd">提交</button>
      <button class="clear-btn" @click="clearPwd">取消</button>
    </div>
  </div>
</template>

<script>
import LoginVerifyCode from '@/components/LoginVerifyCode'
// 导入请求
import { submitChangePwd } from '@/api/changePwd'
export default {
  name: 'ChangePwd',
  components: {
    LoginVerifyCode
  },
  data () {
    return {
      email: '',
      pwd: '',
      pwd_again: '',
      pwd_old: ''
    }
  },
  methods: {
    async submitPwd () {
      // 输入验证
      if (!this.email || !this.pwd || !this.pwd_again || !this.pwd_old) {
        this.$message.closeAll()
        this.$message({
          duration: 1000,
          message: '请填写完整信息',
          type: 'error',
          center: true,
          offset: 150,
          customClass: 'custom-message'
        })
        return
      }
      if (this.pwd !== this.pwd_again) {
        this.$message.closeAll()
        this.$message({
          duration: 1000,
          message: '两次输入密码不一致',
          type: 'error',
          center: true,
          offset: 150,
          customClass: 'custom-message'
        })
        return
      }
      // 提交修改密码请求
      const res = await submitChangePwd(this.email, this.pwd)
      console.log(res)
      this.clearPwd()
    },
    clearPwd () {
      // 清空表单
      this.email = ''
      this.pwd = ''
      this.pwd_again = ''
      this.pwd_old = ''
      // 通信父组件关闭该组件
      this.$emit('closePwd')
    }
  },
  props: {
    bgColor: {
      type: String,
      default: '#fff' // 默认颜色
    }
  }
}
</script>

<style scoped>
.changePwd{
  width: 400px;
  height: 300px;
  background-color: #d0d4d5;
  border: 3px solid #40a0ffa8;
  border-radius: 8px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.form-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}
.form-item label{
  width: 50px;
  text-align: right;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
}

.form-item input {
  flex: 1; /* 让输入框占满剩余空间 */
  padding: 8px 12px 5px;
  font-size: 16px;
  text-align: center;
  outline: none;
  transition: all 0.3s;
  letter-spacing: 0.1em;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.7);
}

/* 设置按钮 */
.buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-top: 6px;
}

.submit-btn,
.clear-btn {
  padding: 10px 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s;
}
.submit-btn {
  background-color: #409eff;
  color: white;
}
.clear-btn {
  background-color: #aaaaaa;
  color: white;
}
.submit-btn:hover {
  background-color: #5fafff;
}
.clear-btn:hover {
  background-color: #b9b9b9;
}
.submit-btn:active {
  transform: scale(0.94);
}
.clear-btn:active {
  transform: scale(0.94);
}

.verify{
  position: relative;
}
.verify_btn{
  position: absolute;
  right: 0px;
  top: 6px;
}
</style>

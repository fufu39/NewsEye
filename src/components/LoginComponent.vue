<!-- login页注册登录框组件 -->
<template>
  <div class="LoginComponent">
    <!-- 最大的盒子为cont -->
    <!-- 此div加了s--signup就默认注册页，不加默认登录页 -->
    <div class="cont">
      <!-- 登录模块 -->
      <div class="form sign-in">
        <h2 class="h2_1">Welcome !</h2>
        <label>
          <span>邮箱</span>
          <input type="email" v-model="email" />
        </label>
        <label class="verify-login">
          <span v-if="loginStyle">验证码</span>
          <span v-else>密码</span>
          <input type="password" v-model="pwd" />
          <LoginVerifyCode class="verify-pwd verify-code-btn" v-if="loginStyle" :email="email"></LoginVerifyCode>
        </label>
        <button type="button" class="submit" @click="submitLogin">
          <p>Sign In</p>
        </button>
        <div class="small-btn">
          <p class="change-login forgot-pass" @click="changLoginStyle">验证码登录</p>
          <p class="forgot-pass" @click="showChangePwd = true">忘记密码?</p>
        </div>
        <!-- 修改密码组件 -->
        <ChangePwd
          class="changePwd-position"
          @closePwd="showChangePwd = false"
          :bgColor="bgColor"
          :class="{ visible: showChangePwd }">
        </ChangePwd>
      </div>
      <div class="sub-cont">
        <!-- 图片模块 -->
        <div class="img">
          <div class="img__text m--up">
            <h2>初到乍来?</h2>
            <p>请前往注册</p>
            <p>我们一起去探索更多可能~</p>
          </div>
          <div class="img__text m--in">
            <h2>已有账号?</h2>
            <p>请立即登录</p>
            <p>我们一直在期待你的归来~</p>
          </div>
          <div class="img__btn" @click="toggleSignUp">
            <span class="m--up">Sign Up →</span>
            <span class="m--in">← Sign In</span>
          </div>
        </div>
        <!-- 注册模块 -->
        <div class="form sign-up">
          <h2 class="h2_2">Create an Account !</h2>
          <label>
            <span>用户名</span>
            <input type="text" v-model="username" />
          </label>
          <label>
            <span>密码</span>
            <input type="password" v-model="pwd" />
          </label>
          <label>
            <span>邮箱</span>
            <input type="email" v-model="email" />
          </label>
          <label class="verify-code">
            <span>验证码</span>
            <input type="text" maxlength="6" v-model="code" />
            <!-- 传递 email 给子组件 -->
            <LoginVerifyCode class="verify-code-btn" :email="email"></LoginVerifyCode>
          </label>
          <button type="button" class="submit"  @click="submitRegister">
            <p>Sign Up</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginVerifyCode from '@/components/LoginVerifyCode.vue'
import ChangePwd from './ChangePwd.vue'
// 引入请求方法：提交注册，登录
import { validateVerifyCode, registerUser } from '@/api/register'
import { loginWithPassword } from '@/api/login'
export default {
  name: 'LoginComponent',
  components: {
    LoginVerifyCode,
    ChangePwd
  },
  data () {
    return {
      username: '',
      pwd: '',
      email: '',
      code: '',
      // 控制忘记密码组件显示
      showChangePwd: false,
      bgColor: '#e9edee',
      // 控制验证码登录显示
      loginStyle: false
    }
  },
  methods: {
    // 点击注册/登录切换
    toggleSignUp () {
      document.querySelector('.cont').classList.toggle('s--signup')
      this.showChangePwd = false
    },
    // 登录请求
    async submitLogin () {
      // 调用接口登录信息判断
      const res = await loginWithPassword(this.email, this.pwd)
      if (res.data.code === 200) {
        this.$message.closeAll()
        this.$message({
          duration: 1000,
          message: '登录成功~',
          type: 'success',
          center: true,
          offset: 20,
          customClass: 'custom-message LoginSuccessMessage'
        })
      } else if (res.data.code !== 200) {
        this.$message.closeAll()
        this.$message({
          duration: 1000,
          message: '账号不存在，或密码错误!',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message LoginErrorMessage'
        })
      }
      // 借助vuex存储包含token的个人信息
      this.$store.commit('user/setUserInfo', {
        token: res.data.data,
        email: this.email
      })

      // 前往主页layout路由
      this.$router.replace('/layout')
    },
    // 注册请求
    async submitRegister () {
      // 发起验证码检验请求
      const resCode = await validateVerifyCode(this.email, this.code)
      if (resCode.status !== 200) {
        this.$message({
          duration: 700,
          message: '验证码错误!',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message verifyCodeMessage'
        })
      }
      // 进行信息非空判断
      if (!this.username) {
        this.$message({
          duration: 700,
          message: '请输入用户名',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message verifyCodeMessage'
        })
        return
      }
      if (!this.pwd) {
        this.$message({
          duration: 700,
          message: '请输入密码',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message verifyCodeMessage'
        })
        return
      }
      if (!this.email) {
        this.$message({
          duration: 700,
          message: '请输入邮箱',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message verifyCodeMessage'
        })
        return
      }
      if (!this.code) {
        this.$message({
          duration: 700,
          message: '请输入验证码',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message verifyCodeMessage'
        })
        return
      }
      // 调用接口注册信息提交
      const res = await registerUser(this.email, this.pwd)
      if (res.data.code === 200) {
        this.$message.closeAll()
        this.$message({
          duration: 700,
          message: '注册成功~',
          type: 'success',
          center: true,
          offset: 20,
          customClass: 'custom-message registerSuccessMessage'
        })
      } else if (res.data.code === 400) {
        this.$message.closeAll()
        this.$message({
          duration: 700,
          message: '账号已存在!',
          type: 'error',
          center: true,
          offset: 20,
          customClass: 'custom-message registerErrorMessage'
        })
      }

      // 切换到登录页面
      this.toggleSignUp()
    },
    // 切换登录方式
    changLoginStyle () {
      this.loginStyle = !this.loginStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginComponent{
  // background: #ededed;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

input, button:not(.verify-code-btn) {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 36px;

$diffRatio: ($contW - $imgW) / $contW;

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

// 最大的盒子cont
.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  margin: 0 auto;
  color: black;
  background-color: #eaf0f2;
  // background-image: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6 98%);
  border-radius: 10px;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 100px 30px 0;
  // form背景色
  background-color: #eaf0f2;
  text-align: center;
}

// 图片模块基础样式
.img{
  border-radius: 5px;
}
.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  // 图片模块背景色
  background-color: #eaf0f2;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1,0,0);
  }
}

button:not(.verify-code-btn) { //不让其对获取验证码按钮
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

h2 {
  width: 100%;
  font-size: 30px;
  text-align: center;
}
h2.h2_1{
  margin-bottom: 50px;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 15px;
    font-weight: 700;
    color: rgba(0,0,0,0.75);
    text-transform: uppercase;
  }
}

.small-btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 160px;
}

// 设置获取验证码按钮
.verify-code{
  position: relative;
}
// 对组件位置进行设置（样式在组件内部设置）
.verify-code .verify-code-btn{
  // 基于验证码框绝对定位
  position: absolute;
  top: 25px;
  right: -90px;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 3px;
  font-size: 16px;
  letter-spacing: 0.1em;
  border-bottom: 1.5px solid rgba(0,0,0,0.7);
  text-align: center;
}

.forgot-pass {
  display: inline-block;
  margin-top: -10px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.75);
  transition: all 0.3s;
  cursor: pointer;
}
.forgot-pass:hover{
  text-decoration: underline;
  color: #0077b6;
  font-size: 13px;
}

.form .submit {
  position: relative;
  margin-top: 40px;
  margin-bottom: 20px;
  // font-weight: bold;
  letter-spacing: 0.15em;
  word-spacing: 0.5em;
  background: linear-gradient(to right, #acb6e5, #92d2f5, #92d2f5, #acb6e5);
  color: black;
  text-transform: uppercase;
  transition: all 0.3s;
}
.form .submit p{
  position: relative;
  z-index: 999;
  font-weight: bold;
}
/* 新增伪元素 */
.form .submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: linear-gradient(to right, #4a00e0, #8e2de2, #8e2de2, #4a00e0);
  opacity: 0;
  transition: all 0.3s;
  z-index: 1;
}
.submit:hover::before {
  opacity: 1;
}
// 提交按钮悬停效果
.submit:hover{
  transform: scale(1.06);
  color: #fff;
}

.img .img__text{
  // background-color: pink;
  margin-top: 50px;
  padding: 0 30px;
}
.img .img__text h2{
  font-size: 30px;
  margin-bottom: 20px;
}
.img .img__text p{
  font-size: 14px;
  margin-bottom: 5px;
}
.img .img__btn{
  text-align: center;
  letter-spacing: 0.1em;
  width: 126px;
  transition: transform 0.5s;
}
.img .img__btn:hover{
  transform: scale(1.1);
}

// 登录、注册模块的移动
.sign-in {
  transition-timing-function: ease-out;

  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($formW,0,0);
  }
}

.sign-up {
  transform: translate3d($contW * -1,0,0);
  padding-top: 50px; // 单独修改布局（表单太多了）

  @include signUpActive {
    transform: translate3d(0,0,0);
  }
}

// img模块移动
.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    // 背景图/背景色
    background-image: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6 98%);
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0,0,0,0.6);
    background-color: transparent;
  }

  @include signUpActive {
    &::before {
      transform: translate3d($formW,0,0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {

      @include signUpActive {
        transform: translateX($imgW*2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: $btnH;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;

    &::after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;

      &.m--in {
        transform: translateY($btnH*-2);

        @include signUpActive {
          transform: translateY(0);
        }
      }

      &.m--up {
        @include signUpActive {
          transform: translateY($btnH*2);
        }
      }
    }
  }
}

// 控制忘记密码组件位置
.changePwd-position{
  z-index: 9999;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s;
}
.changePwd-position.visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease-in-out;
}

// 验证码登录样式
.verify-login{
  position: relative;
}
.verify-pwd{
  position: absolute;
  top: 25px;
  right: -85px;
}

</style>

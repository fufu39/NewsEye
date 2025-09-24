<!-- Login页面作为通用首页 -->
<template>
  <div class="login">
    <!-- header区域 -->
    <div class="header">
      <!-- 左上角logo -->
      <router-link to="/home" class="logo">
        <img src="@/assets/logo.png">
      </router-link>
      <!-- 右上角小导航栏 -->
      <nav class="nav">
        <LoginBackButton to="/home" text="Home" iconClass="el-icon-s-home"></LoginBackButton>
      </nav>
    </div>
    <!-- 登录注册框 -->
    <div class="loginComponent">
      <LoginComponent></LoginComponent>
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
import LoginBackButton from '@/components/LoginBackButton.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginComponent,
    LoginBackButton
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  margin: 0;
  position: relative;
  overflow: hidden;
  /* 背景渐变色 */
  background: linear-gradient(to top, #f2fcfe -30%, #a4d1fe 25%, #a4d1fe 75%, #f2fcfe 100%);
  /* background: linear-gradient(to top, #e6f2ff 0%, #b3d9ff 35%, #b3d9ff 50%, #b3d9ff 55%, #e6f2ff 90%); */
}

/* 左上角logo */
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  padding: 15px 20px;
  /* background-color: skyblue; */
}

.logo{
  display: block;
  position: relative;
}

.logo img {
  mix-blend-mode: multiply; /* 背景混合模式 */
  margin-top: 10px;
  margin-left: -10px;
  height: 90px;
}

/* 右上角导航栏 */
.nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
  margin-right: 20px;
  margin-top: -5px;
}

/* 设置LoginComponent组件位置 */
.loginComponent{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  margin-top: -45px;
}
.LoginComponent{
  border-radius: 10px;
  box-shadow: 0 5px 20px #7d93cd;
}
</style>

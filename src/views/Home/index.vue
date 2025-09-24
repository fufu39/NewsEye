<template>
  <div class="home">
    <!-- header区域 -->
    <div class="header">
      <!-- 左上角logo -->
      <router-link to="/home" class="logo">
        <img src="@/assets/logo.png">
      </router-link>
      <!-- 右上角小导航栏 -->
      <nav class="nav">
        <!-- <router-link to="/home" class="nav-item cssbuttons-io-button">
          Home
          <div class="icon">
            <i class="el-icon-s-home"></i>
          </div>
        </router-link> -->
        <router-link to="/about" class="nav-item cssbuttons-io-button">
          说明文档
          <div class="icon">
            <i class="el-icon-star-on" style="font-size: 25px;"></i>
          </div>
        </router-link>
        <router-link to="/terms" class="nav-item cssbuttons-io-button">
          用户协议
          <div class="icon">
            <i class="el-icon-info" style="font-size: 22px;"></i>
          </div>
        </router-link>
        <router-link to="/login" class="nav-item cssbuttons-io-button">
          Log in
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </router-link>
      </nav>
    </div>
    <!-- main区域 -->
    <div class="main">
      <h1 class="project-name">NewsEye</h1>
      <p class="project-description">新闻之眼：智能新闻伪造检测系统</p>
      <button class="login-button" @click="$router.push('/login')"> <span>点击登录</span></button>
    </div>
    <!-- 色块区域 -->
    <div class="circle">
      <div class="circle_one"></div>
      <div class="circle_two"></div>
      <div class="light">
        <img :src="imageSource"
        @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
        width="240" height="240">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      imageSource: require('@/assets/light.svg') // light默认图片
    }
  },
  methods: {
    handleMouseEnter () {
      this.imageSource = require('@/assets/light_1.svg')
    },
    handleMouseLeave () {
      this.imageSource = require('@/assets/light.svg')
    }
  }
}
</script>

<style scoped>
.home {
  background: linear-gradient(to top, #e6f2ff 0%, #b3d9ff 35%, #b3d9ff 50%, #b3d9ff 55%, #e6f2ff 90%);
  height: 100vh;
  margin: 0;
  position: relative;
  overflow: hidden;
}

/* 左上角logo */
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  padding: 15px 20px 15px 5px;
  /* background-color: skyblue; */
}

.logo{
  display: block;
}

.logo img {
  mix-blend-mode: multiply; /* 背景混合模式 */
  margin-top: 10px;
  height: 100px;
}

/* 右上角导航栏 */
.nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
  margin-right: 20px;
  margin-top: -10px;
}

.nav-item {
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

/* 右上角按钮 */
.cssbuttons-io-button {
  background: linear-gradient(to bottom, #e6f2ff 0%, #b3d9ff);
  color: #0077b6;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow:0 0 1.6em -0.6em #7eaac8;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
  font-weight: bold;
}

.cssbuttons-io-button:not(:last-child){
  padding: 1.2em;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #7eaac8;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:not(:last-child) .icon{
  width: calc(100% - 0.6em);
  color: #0077b6;
  opacity: 0;
  transition: opacity 0.4s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button:not(:last-child):hover .icon{
  opacity: 1;
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #0077b6;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
  width: 1.5em;
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.88);
}

/* 设置字体图标的大小 */
.cssbuttons-io-button .icon .el-icon-s-home,
.cssbuttons-io-button .icon .el-icon-star-on{
  font-size: 25px;
}

/* 主体内容 */
.main {
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
  margin-top: -120px;
  z-index: 999;
}

.project-name {
  font-size: 100px;
  color: #023e8a;
  font-weight: 700;
  letter-spacing: 0.12em;
  z-index: 999;
}

.project-description {
  font-size: 30px;
  color: #023e8a;
  margin: 25px 0;
  letter-spacing: 0.3em;
  z-index: 999;
}

/* 色块区域 */
.circle_one {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(-27%) translateY(28%);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0077b6, #5dade2 35%, #ffffff 90%); /* 左下蓝色，右上白色 */
  z-index: 1;
  transition: all 0.4s;
}
.circle_two{
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(120%) translateY(-180%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, #e6f2ff 30%, #90e0ef 100%);
  /* background: radial-gradient(circle, #fff5b3 30%, #c8a828 100%); */
  z-index: 2;
  transition: all 0.5s;
}

.circle_one:hover{
  transform: translate(calc(-27% + 10px), calc(28% - 10px));
}
.circle_two:hover{
  transform: translate(calc(120% - 10px), calc(-180% - 8px));
}

.light {
  position: absolute;
  bottom: 40%;
  right: 10%;
  z-index: 1;
  mix-blend-mode: multiply;
}

.light:hover{
  mix-blend-mode: normal;
  transform: scale(1.2);
  transition: all 0.4s;
}

.light:not(:hover) {
  transition: all 0.4s;  /* 当不悬停时，设置为 multiply */
}

/* 登录按钮 */
.login-button {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 17px;
  border-radius: 500px;
  overflow: hidden;
  background: #90e0ef;
  color: ghostwhite;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.login-button span {
  position: relative;
  z-index: 10;
  transition: color 0.6s;
}

.login-button:hover span {
  color: #000;
}
.login-button:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.login-button::before,
.login-button::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.login-button::before {
  content: "";
  background: #023e8a;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.login-button:hover::before {
  transform: translate3d(100%, 0, 0);
}

.login-button:active{
  transform: scale(1.02);
}
</style>

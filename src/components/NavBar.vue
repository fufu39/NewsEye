<!-- layout页面导航栏组件 -->
<template>
  <div class="navbar">
    <!-- 左上角logo -->
    <router-link to="/home" class="logo">
      <img src="@/assets/logo.png">
    </router-link>
    <!-- 导航栏 -->
    <nav>
      <ul>
        <li><NavButton :goto="'detection'">新闻检测</NavButton></li>
        <li><NavButton :goto="'history'">历史记录</NavButton></li>
        <li><NavButton :goto="'dashboard'">数据统计</NavButton></li>
        <li><NavButton :goto="'profile'">个人中心</NavButton></li>
      </ul>
      <!-- 右上角按钮 -->
      <!-- <div class="button">
        <a class="btn-open">
          <i :class="iconClass"></i>
        </a>
      </div> -->
    </nav>
    <!-- 覆盖层:脱标 -->
    <!-- <div class="overlay">
      <div class="wrap">
        aaa
      </div>
    </div> -->
  </div>
</template>

<script>
import NavButton from './NavButton.vue'
export default {
  name: 'NavBar',
  components: { NavButton },
  data () {
    return {
      // isOpen: false, // 用来切换计算属性中的iconClass的值
    }
  },
  computed: {
    // iconClass () {
    //   return this.isOpen ? 'el-icon-close' : 'el-icon-pie-chart'
    // }
  },
  methods: {

  }
  // mounted () {
  //   // 给切换按钮和覆盖层绑定点击事件
  //   const buttonLink = document.querySelector('.button a')
  //   const overlay = document.querySelector('.overlay')
  //   if (buttonLink && overlay) {
  //     // 绑定右上角按钮点击事件
  //     buttonLink.addEventListener('click', () => {
  //       this.isOpen = !this.isOpen
  //       // 通过visible类实现渐入渐出，两种状态的类分别对应open/close
  //       overlay.classList.toggle('visible')
  //       buttonLink.classList.toggle('btn-open')
  //       buttonLink.classList.toggle('btn-close')
  //     })
  //     // 绑定overlay覆盖层点击事件
  //     overlay.addEventListener('click', () => {
  //       this.isOpen = !this.isOpen
  //       overlay.classList.toggle('visible')
  //       buttonLink.classList.toggle('btn-open')
  //       buttonLink.classList.toggle('btn-close')
  //     })
  //   }
  // }
}
</script>

<style scoped>
/* logo设置 */
.logo{
  display: block;
  position: absolute;
  top: 13px;
  left: 0px;
  z-index: 2;
  mix-blend-mode: multiply;
}

.logo img {
  height: 80px;
}
/* 基础样式设置 */
.navbar {
  margin: 0;
  padding: 16px 0 1px;
  /* 导航栏背景色 */
  /* background: rgba(0, 0, 0, 0.2); */
  /* border-bottom: 1px solid #000; */
  position: relative;
  font-size:12px;
}
ul {
  margin:0;
  padding:0;
  text-decoration:none;
  list-style:none;
}
li {
  padding:0;
  margin:0;
}
nav {
  position:relative;
  text-align:center;
  width:100%;
  height:auto;
  /* overflow:hidden; */
  background:none;
}
nav ul {
  text-align:center;
}
nav ul li {
  display:inline-block;
  /* background-color: pink; */
  /* border: 1px solid #000; */
}
/* 导航按钮设置 */
/* 放在NavButton.vue组件内 */

/* 右上角按钮样式 */
/* .button {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 175px;
  top: 15px;
  z-index: 9999;
  font-size:40px;
}
.button a {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-size:40px;
  transition: all 0.4s;
  padding: 5px;
} */

/* 单独为按钮设置样式 */
/* .button .btn-open{
  color: #000;
}
.button .btn-open:hover{
  box-shadow: 0px 0px 0px 3px #000;
}
.button .btn-close{
  color: #fff;
}
.button .btn-close:hover{
  box-shadow: 0px 0px 0px 3px #fff;
} */

/* 覆盖层基础样式 */
/* .overlay {
  position:fixed;
  top:0;
  height:100%;
  width:100%;
  background:#333333;
  overflow:auto;
  z-index: 9998;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s;
}
.overlay.visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease-in-out;
} */
/*
我来解释下上面的原理：
.overlay状态下，点击添加visible类，看的是.overlay.visible里的transition（因为选择器优先级高，transition覆盖）
.overlay.visible状态下，点击移除后看的是.overlay里的transition，这里面让visibility延迟1s隐藏，能有opacity的渐变效果
*/
</style>

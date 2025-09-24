<!-- 404路径不匹配的展示页面 -->
<template>
  <div class="notFound">
    <!-- 直接在线引入lottie组件 -->
    <dotlottie-player
    v-if="lottieLoaded"
    src="https://lottie.host/716eb411-8835-4225-a9ee-9c732694b58b/PJmaVZKULs.lottie"
    background="transparent"
    speed="1"
    style="width: 700px; height: 700px"
    direction="1"
    playMode="normal"
    loop autoplay>
    </dotlottie-player>
    <!-- 按钮组件 -->
    <router-link to="/home" class="button" v-if="lottieLoaded">
      Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  data () {
    return {
      lottieLoaded: false // 用于确保script加载完成后再渲染
    }
  },
  mounted () {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs'
    script.type = 'module'
    script.onload = () => {
      this.lottieLoaded = true
    }
    document.head.appendChild(script)
  }
}
</script>

<style scoped>
.notFound{
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -12vh;
}

/* 小恐龙设置 */
dotlottie-player {
  width: 800px !important;
  height: 800px !important;
  /* border: 1px solid #000; */
}

/* 按钮设置 */
.button {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding: 5px 30px;
  font-size: 24px;
  /* 设置按钮颜色 */
  color: #373737;
  border: 4px solid #373737;
  border-radius: 34px;
  background-color: transparent;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;
  box-shadow: 0 0px 3px #373737;
  margin-top: -8vh;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: inherit;
  /* 通过scale实现蒙层覆盖 */
  scale: 0;
  z-index: -1;
  /* 设置蒙层颜色 */
  background-color: #373737;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
  scale: 5;
}

.button:hover {
  color: #fff;
  scale: 1.1;
  /* 阴影颜色 */
  box-shadow: 0 0px 20px #373737;
}

.button:active {
  scale: 1;
}
</style>

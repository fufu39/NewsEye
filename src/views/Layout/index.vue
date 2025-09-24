<!-- 登录后的首页展示 -->
<template>
  <div class="layoutIndex">
    <!-- 上面是导航栏 -->
    <NavBar></NavBar>
    <!-- 下面是二级路由展示 -->
    <router-view class="router-view-style draw-border"></router-view>
    <!-- 装饰元素 -->
    <div class="decoration_circle decoration_1"></div>
    <div class="decoration_circle decoration_2"></div>
    <div class="decoration_circle decoration_3"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'IndexPage',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
// 颜色变量
$default: black; // 默认颜色
$finally: #2277ff; // 变化后的颜色

.layoutIndex{
  /* 由内容撑开 */
  // 处理外边距塌陷（父级）
  overflow: hidden;
  position: relative;

  /* 设置主背景色 */
  background: linear-gradient(to top, #a4d1fe 15%, #a4d1feec 50%, #a4d1fed3 75%, #f2fcfe 100%);
}

/* 设置二级路由视口，统一的默认设置，具体设置在每个二级路由的.wrapper内 */
.router-view-style{
  width: 80vw;
  // border-radius: 1.5vw;
  /* 设置版心位置 */
  margin: 0 auto;
  margin-top: 25px;
  padding: 0;
  background: #fff;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);

  color: #000;
  font-size: 40px;
  font-family: 'Source Han Sans';
  text-align: center;
  position: relative;
  z-index: 99;

  // outline: 0.1px solid black;
  // outline-offset: -15vw;
}

/* 背景装饰元素 */
.decoration_circle {
  position: fixed;
  border-radius: 50%;
  z-index: 9; // 在二级路由下方（二级路由设置99）
  pointer-events: none;
}
.decoration_1 {
  bottom: -100px;
  left: -100px;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(34, 119, 255, 0.8), rgba(255, 255, 255, 0.9));
}
.decoration_2{
  top: 220px;
  right: -10px;
  width: 120px;
  height: 120px;
  border: 2px solid rgb(34, 119, 255, 0.7);
}
.decoration_3{
  top: 280px;
  right: 20px;
  width: 240px;
  height: 240px;
  background-color: #1e74ff;
  background: linear-gradient(45deg, #b0d8ff, #2c7dff);
}

/* 设置边框颜色css动画 */
.draw-border {
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: none;
    // 避免影响鼠标对内容的控制
    pointer-events: none;
    // 伪元素设置边框 透明边框，但宽高为0保持不可见
    border: 4px solid transparent;
    width: 0;
    height: 0;
  }

  // 绝对定位于左上
  &::before,
  &::after{
    top: 0;
    left: 0;
  }

  // 覆盖时填充整个盒子
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  // 悬停时：延迟过渡效果实现颜色的顺序变化
  &:hover::before {
    border-top-color: $finally;
    border-right-color: $finally;
    transition:
      width 0.4s linear,
      height 0.4s linear 0.4s;
  }
  &:hover::after {
    border-bottom-color: $finally;
    border-left-color: $finally;
    transition:
      height 0.4s linear,
      width 0.4s linear 0.4s;
  }
}

// 添加no-hover类时取消hover效果
.draw-border.no-hover:hover::before,
.draw-border.no-hover:hover::after {
  width: 0;
  height: 0;
  border-color: transparent;
  transition: none;
}
</style>

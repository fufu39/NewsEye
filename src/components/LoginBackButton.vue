<!-- login页面右上角的返回主页按钮 -->
<template>
  <router-link :to="to" class="nav-item cssbuttons-io-button">
    {{ text }}
    <div class="icon">
      <i :class="iconClass"></i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'LoginBackButton',
  // 通过父传子进行参数、文本设置
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: 'Home'
    },
    iconClass: {
      type: String,
      default: 'el-icon-s-home'
    }
  }
}
</script>

<style scoped>
.nav-item {
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

/* 按钮效果设置 */
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

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
  color: #0077b6;
}

.cssbuttons-io-button .icon .el-icon-s-home {
  width: 1.1em;
  transition: transform 0.3s;
  color: #0077b6;
}

.cssbuttons-io-button:hover .icon .el-icon-s-home {
  transform: translateX(0.1em);
  width: 1.5em;
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.88);
}

/* 设置字体图标的大小 */
.cssbuttons-io-button .icon .el-icon-s-home{
  font-size: 25px;
}
</style>

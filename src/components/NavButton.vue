<!-- NavBar.vue导航栏组件下的按钮组件 -->
<template>
  <!--  tabindex="-1"是禁止Tab点击，:replace="true"指定跳转方式为replace而不是push -->
  <router-link
    :to="goto"
    :replace="true"
    class="nav-btn"
    tabindex="-1">
    <!-- 通过插槽传递内容 -->
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    goto: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.nav-btn {
  display: inline-block;
  --clr-font-main: hsla(0 0% 20% / 1);
  --btn-bg-1: hsla(194 100% 69% / 1);
  --btn-bg-2: hsla(217 100% 56% / 1);
  --btn-bg-color: hsla(360 100% 100% / 1);
  --radii: 0.5em;
  cursor: pointer;
  padding: 15px 30px;
  margin: 7px 33px;
  min-width: 120px;
  min-height: 48px;
  font-size: 21px;
  font-weight: 400;
  transition: all 0.5s;
  font-size: 21px;
  line-height: 30px;
  color: #fff;
  background-size: 280% auto;
  background-image: linear-gradient(
    325deg,
    var(--btn-bg-2) 0%,
    var(--btn-bg-1) 55%,
    var(--btn-bg-2) 90%
  );
  border: none;
  border-radius: var(--radii);
  box-shadow:
    0px 0px 20px rgba(71, 184, 255, 0.5),
    0px 5px 5px -1px rgba(58, 125, 233, 0.25),
    inset 4px 4px 8px rgba(175, 230, 255, 0.5),
    inset -4px -4px 8px rgba(19, 95, 216, 0.35);
}

.nav-btn:hover {
  background-position: right top;
}

/* .nav-btn:focus {
  outline: none;
  transform: scale(1.1);
  box-shadow:
    0 0 0px 3px var(--btn-bg-color),
    0 0 2px 6px var(--btn-bg-2);
} */
.nav-btn.router-link-active {
  outline: none;
  transform: scale(1.1);
  /* 通过阴影的扩展实现边框效果 */
  box-shadow:
    0 0 0px 3px var(--btn-bg-color),
    0 0 2px 6px var(--btn-bg-2);
}
</style>

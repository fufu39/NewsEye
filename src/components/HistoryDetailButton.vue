<template>
  <button class="bttn-jelly bttn-sm bttn-primary">查看详情</button>
</template>

<script>
import '@/styles/bttn.css'
export default {
  name: 'HistoryDetailButton'
}
</script>

<style scoped>
button.bttn-jelly {
  margin: 0;
  padding: 0;
  border-width: 0;
  border-color: transparent;
  background: transparent;
  outline: none;
  position: relative;
  font-size: 13px;
  padding: 5px 12px;
  overflow: hidden;
  border-radius: 50px;
  background: #fff;
  color: #3883fbea;
  letter-spacing: 1.2px;
  font-weight: bold;
  transition: all 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 0 10px rgba(58,51,53,0.22);
  z-index: 9999;
}
button.bttn-jelly:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: #85b8fff0;
  content: '';
  z-index: -1;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
  transform: scale(0.2);
}
button.bttn-jelly:hover:before{
  opacity: 0.18;
  transform: scale(1);
}
button.bttn-jelly:hover{
  transform: scale(1.05);
}
button.bttn-jelly:active {
  transform: scale(0.94);
}
button.bttn-jelly:active:before {
  opacity: 0.18;
  transform: scale(1);
}
</style>

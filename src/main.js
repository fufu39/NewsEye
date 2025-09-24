// 默认导入
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element-ui组件
import '@/utils/element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 要引入element样式！

// 导入通用样式common.css（用于清除默认结构）
import '@/styles/common.css'
// 导入全局message.css（用于定义消息弹窗的默认样式）
import '@/styles/message.css'

// 全局注册Loading加载动画组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

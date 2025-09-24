<!-- 历史记录页面，可以进行导入导出 -->
<template>
  <div class="wrapper">
    <!-- 详情页展示区：传递结果对象 -->
    <ResultHistoryDisplay
    @update="isVisible = $event"
    :isVisible="isVisible"
    :result="selectedDetail">
    </ResultHistoryDisplay>
    <!-- 内容区 -->
    <div class="content">
      <h1 class="page-title"><span>「</span> History 历史记录 <span>」</span></h1>
    </div>
    <!-- 搜索框区 -->
    <HistorySearchButtonVue class="search-button" @search="handleSearch"></HistorySearchButtonVue>
    <!-- 历史记录区 -->
    <div class="history">
      <!-- 跳转框 -->
      <ul class="sidebar">
        <li @click="scrollToCategory('HalfHour')" :class="{ active: activeCategory === 'HalfHour' }">30分钟内</li>
        <li @click="scrollToCategory('Day')" :class="{ active: activeCategory === 'Day' }">今日内</li>
        <li @click="scrollToCategory('Week')" :class="{ active: activeCategory === 'Week' }">前7天</li>
      </ul>
      <!-- 手风琴历史记录 -->
      <div class="accordion">
        <!-- 30分钟内的手风琴 -->
        <div class="el-collapse-title" ref="HalfHourSection" :class="{ active: activeCategory === 'HalfHour' }">30分钟内</div>
        <el-collapse v-model="activeNameHalfHour" accordion>
          <el-collapse-item
          v-for="(item, index) in filteredSections.HalfHourSections"
          :key="index"
          :name="index+1">
            <template #title>
              <div class="item-title">
                <span>{{ formatTime(item.time) }}</span>
                <!-- 显示详情的按钮 -->
                <HistoryDetailButton class="detail-button" @click.native="handleClick(item)"></HistoryDetailButton>
              </div>
            </template>
            <div>{{ item.text }}</div>
          </el-collapse-item>
        </el-collapse>

        <!-- 今天内的手风琴 -->
        <div class="el-collapse-title" ref="DaySection" :class="{ active: activeCategory === 'Day' }">今日内</div>
        <el-collapse v-model="activeNameDay" accordion>
          <el-collapse-item
          v-for="(item, index) in filteredSections.DaySections"
          :key="index"
          :name="index+1">
            <template #title>
              <div class="item-title">
                <span>{{ formatTime(item.time) }}</span>
                <!-- 显示详情的按钮 -->
                <HistoryDetailButton class="detail-button" @click.native="handleClick(item)"></HistoryDetailButton>
              </div>
            </template>
            <div>{{ item.text }}</div>
          </el-collapse-item>
        </el-collapse>

        <!-- 7天内的手风琴 -->
        <div class="el-collapse-title" ref="WeekSection" :class="{ active: activeCategory === 'Week' }">前7天</div>
        <el-collapse v-model="activeNameWeek" accordion>
          <el-collapse-item
          v-for="(item, index) in filteredSections.WeekSections"
          :key="index"
          :name="index+1">
            <template #title>
              <div class="item-title">
                <span>{{ formatTime(item.time) }}</span>
                <!-- 显示详情的按钮 -->
                <HistoryDetailButton class="detail-button" @click.native="handleClick(item)"></HistoryDetailButton>
              </div>
            </template>
            <div>{{ item.text }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 装饰区 -->
    <div class="decoration">
      <img src="@/assets/history.svg" alt="">
    </div>
    <div class="decoration_global">
      <img src="@/assets/global.svg" alt="">
    </div>
  </div>
</template>

<script>
import ResultHistoryDisplay from '@/components/ResultHistoryDisplay.vue'
import HistorySearchButtonVue from '@/components/HistorySearchButton.vue'
import HistoryDetailButton from '@/components/HistoryDetailButton'
import store from '@/store'
// 导入dayjs时间库
import dayjs from 'dayjs'
// 引入请求方法：获取历史记录
import { getHistoryDetail } from '@/api/history.js'
export default {
  name: 'HistoryPage',
  components: {
    ResultHistoryDisplay,
    HistorySearchButtonVue,
    HistoryDetailButton
  },
  data () {
    return {
      activeNameHalfHour: '', // 三个分别绑定手风琴的name
      activeNameDay: '',
      activeNameWeek: '',
      activeCategory: 'HalfHour', // 当前跳转的分类
      filteredSections: { // 分类后的手风琴
        HalfHourSections: [],
        DaySections: [],
        WeekSections: []
      },
      // sections: [{ time: '', text: '', bic: '', multicls: '', token: {}, img: '', description: '' }],
      sections: [
        { time: '2025-04-13T01:50:02', confidence_score: 0, text: '你只需在这个国家的公共平台上，泼足够多的脏水，各种质疑，各种谬传，丢出足量的阴谋论，这样一来公众都不知道该相信什么', bic: '虚假', multicls: '脸部被替换', token: {}, img: require('@/assets/result1.png'), description: '视频中的演讲的人物脸部动作生硬不自然，图片中的面部被红色方框标记出来，表明该图片可能经过了编辑或篡改。具体来说，图片中被标记的面部看起来像是经过了合成或替换处理，而不是原始照片的一部分。这种类型的虚假信息通常涉及图像编辑技术，例如使用图像编辑软件将一个人的脸部替换到另一个人身上。这种编辑可以用来制造假新闻或传播虚假信息，以误导观众，掩盖其真实来源或意图欺骗观众。' },
        { time: '2025-04-12T22:38:50', confidence_score: 10, text: '中国外交部副部长刘建超星期四会见了日本外相杉山慎介', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-12T22:38:48', confidence_score: 15, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-12T22:38:47', confidence_score: 20, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-12T18:18:01', confidence_score: 21, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-12T18:18:01', confidence_score: 25, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T18:18:01', confidence_score: 31, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 45, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 50, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 55, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 58, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 60, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 61, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 65, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 70, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-11T02:18:01', confidence_score: 78, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-13T00:18:01', confidence_score: 80, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 86, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 90, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 93, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 100, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-09T02:18:01', confidence_score: 88, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 53, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T02:18:01', confidence_score: 67, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
        { time: '2025-04-08T12:18:01', confidence_score: 34, text: '内容文本2025-04-03T12:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=000000', description: '注释' }
      ],
      selectedDetail: { time: '', text: '', bic: '', multicls: '', token: {}, img: '', description: '' }, // 当前点击的项
      isVisible: false // 控制详情页是否显示
    }
  },
  methods: {
    // 根据时间对每一项分类
    filterSections (sections) {
      const now = new Date() // 当前时间
      const thirtyMinutes = 1000 * 60 * 30 // 30分钟的毫秒数
      const todayStart = new Date(now)
      todayStart.setHours(0, 0, 0, 0) // 今天开始的时间
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - 7) // 一周前的时间

      this.filteredSections = {
        HalfHourSections: sections.filter(item => {
          const itemTime = new Date(item.time)
          return now - itemTime <= thirtyMinutes
        }),
        DaySections: sections.filter(item => {
          const itemTime = new Date(item.time)
          return itemTime >= todayStart && now - itemTime > thirtyMinutes
        }),
        WeekSections: sections.filter(item => {
          const itemTime = new Date(item.time)
          return itemTime >= weekStart && itemTime < todayStart
        })
      }
    },
    // 点击滚动到指定手风琴位置
    scrollToCategory (category) {
      this.activeCategory = category
      const section = this.$refs[`${category}Section`]
      if (section) {
        // 滚动到对应的标题
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    // 监听滚动事件，动态修改active
    handleScroll () {
      // 定义三个标题的 ref 名称
      const sections = ['HalfHourSection', 'DaySection', 'WeekSection']
      let candidate = null // 存储当前的手风琴
      let candidateTop = Infinity // 存储在视口中且距离顶部最小的值

      sections.forEach(section => {
        const ref = this.$refs[section]
        if (ref) {
          const rect = ref.getBoundingClientRect()
          // 如果标题在视口内（top >= 0），且距离顶部比之前的更近
          if (rect.top >= -45 && rect.top < candidateTop) {
            candidate = section
            candidateTop = rect.top
          }
        }
      })

      // 如果找到了 candidate，就设置 activeCategory
      if (candidate) {
        this.activeCategory = candidate.slice(0, -7)
      } else {
        this.activeCategory = 'Week'
      }
    },
    // 格式化时间为指定形式
    formatTime (time) {
      // return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      return dayjs(time).format('M月D日 HH:mm:ss')
    },
    // 查看详情按钮点击事件
    async handleClick (item) {
      // 触发详情弹窗
      this.selectedDetail = item
      this.isVisible = true
    },
    // 处理搜索
    handleSearch (keyword) {
      this.$store.commit('setLoading', true) // 开启 loading
      const filtered = this.sections.filter(item =>
        // 提供文本、真实性、错误类型、描述的搜索
        item.text.includes(keyword) ||
        item.bic.includes(keyword) ||
        item.multicls.includes(keyword) ||
        item.description.includes(keyword)
      )
      // 调用分类函数对过滤后的数据进行分类
      setTimeout(() => {
        this.filterSections(filtered)
        this.$store.commit('setLoading', false) // 关闭 loading
      }, 300) // 手动0.3s的加载动画doge)
    }
  },
  async created () {
    // 获取历史记录请求
    // const res = await getHistoryDetail()
    // console.log(res)
    // this.sections = res.data
    try {
      const res = await getHistoryDetail(store.getters.email)
      // console.log(res)
      this.sections = res.data.data
    } catch (error) {
      console.error('获取历史记录失败：', error)
    }
    this.filterSections(this.sections)
  },
  mounted () {
    // 在页面加载完成后开始监听滚动事件
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // 在组件销毁时移除滚动事件监听
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.wrapper{
  /* 设置版心高度（可删掉改为内容撑开） */
  min-height: calc(100vh - 156px);
  height: auto;
  margin-bottom: 40px;
  padding: 45px 15vw 40px;
  text-align: center;
  position: relative;
  /* flex布局 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* outline: 0.1px solid black;
  outline-offset: -15vw; */
}

/* 内容区 */
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36vw;
}
.content .page-title {
  font-size: 50px;
  font-weight: bold;
  color: #0f6bffcf;
  line-height: 70px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
.content .page-title span {
  font-size: 70px;
  line-height: 70px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 1.8px #0f6bffc4;
  text-shadow: none;
}

/* 装饰区 */
.decoration{
  position: absolute;
  top: 50px;
  right: 60px;
  pointer-events: none;
}
.decoration img{
  width: 160px;
  animation: floatRotateAnimation 3s linear infinite;
}
.decoration_global{
  position: absolute;
  z-index: 999;
  pointer-events: none;
  top: 50px;
  left: 70px;
}
.decoration_global img{
  width: 150px;
  animation: scaleAnimation 3.5s infinite ease-in-out;
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1); /* 初始大小 */
  }
  50% {
    transform: scale(1.15); /* 放大一点 */
  }
  100% {
    transform: scale(1); /* 恢复原始大小 */
  }
}
@keyframes floatRotateAnimation {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(15deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-8deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

/* 搜索框组件定位 */
.search-button{
  width: 400px;
  height: 60px;
  margin-top: 35px;
  margin-bottom: 15px;
  /* background-color: rgba(255, 192, 203, 0.415); */
}
/* 历史记录区 */
.history{
  width: 42vw;
  padding: 20px 40px;
  /* border: 1px solid #000000c4; */
  box-shadow: 0px 0px 10px #76afffce;
  margin-left: 140px;
}
.history .sidebar {
  /* width: 120px; */
  position: fixed;
  top: 360px;
  left: 350px;
}
.history .sidebar li{
  cursor: pointer;
  font-size: 16px;
  padding: 16px 50px;
  color: #f5f5f6;
  background-color: rgba(78, 84, 90, 0.9);
  border-bottom: 2px solid #565c63;
  transition: all 0.3s;
}
.history .sidebar li:last-child{
  border-bottom: none;
}
.history .sidebar .active{
  background-color: #3f4348;
  box-shadow: inset 6px 0 0 #2277ff;
}
/* 手风琴框总设置 */
.history .accordion{
  transition: all 0.4s;
}
/* 每个手风琴标题 */
.history .accordion .el-collapse-title{
  text-align: left;
  font-weight: bold;
  font-size: 22px;
  width: 200px;
  padding: 5px 20px 5px 0px;
  transition: all 0.4s;
  margin-bottom: 10px;
}
.history .accordion .el-collapse-title:nth-child(n+2){
  margin-top: 70px;
}
.history .accordion .active.el-collapse-title {
  color: #4492ff;
  border-bottom: 4px solid #2062bab2;
  font-size: 24px;
}
/* 每个手风琴 */
.history .accordion .el-collapse{
  border: none;
}
/* 每个手风琴内元素 */
.history .accordion .el-collapse ::v-deep .el-collapse-item{
  position: relative;
  border: none;
  box-shadow: 1px 1px 4px #00000085;
  margin-bottom: 20px;
}
.history .accordion .el-collapse ::v-deep .el-collapse-item .el-collapse-item__header{
  font-family: 'Open Sans';
  font-size: 24px;
  height: auto;
  padding: 8px 110px 8px 18px;
}
.history .accordion .el-collapse ::v-deep .el-collapse-item .el-collapse-item__wrap{
  width: 580px;
  margin: 0 20px 0 20px;
  text-align: left;
}
.history .accordion .el-collapse ::v-deep .el-collapse-item .el-collapse-item__wrap .el-collapse-item__content{
  font-size: 16px;
  padding: 10px 0 20px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  word-wrap: break-word; /* 确保长单词可以换行 */
  overflow-wrap: break-word; /* 为内容溢出部分强制换行 */
  white-space: normal; /* 确保文本会换行 */
}

/* 详情按钮位置 */
.history .accordion .el-collapse .detail-button{
  position: absolute;
  top: 18px;
  right: 13px;
}
</style>

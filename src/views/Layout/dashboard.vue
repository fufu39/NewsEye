<!-- 仪表盘页面，用于数据展示 -->
<!-- [0-20]极低，(20-40]较低，(40-60]中等，(60-80]较高，(80-100]极高 -->
<template>
  <div class="wrapper">
    <!-- 内容区 -->
    <div class="content">
      <h1 class="page-title"><span>「</span> Charts 数据统计 <span>」</span></h1>
    </div>
    <!-- 装饰区 -->
    <div class="decoration">
      <img src="@/assets/chart.svg" alt="">
    </div>
    <div class="decoration_global">
      <img src="@/assets/global.svg" alt="">
    </div>
    <!-- 图表展示区 -->
    <div class="showCharts">
      <!-- 分图表 - 真实/虚假比例 -->
      <div class="sorted1">
        <div class="sortedChart sortedPie1" ref="sortedChartPie1"></div>
        <div class="sortedChart sortedPie2" ref="sortedChartPie2"></div>
        <div class="sortedChart sortedPie3" ref="sortedChartPie3"></div>
      </div>
      <!-- 分图表 - 虚假程度占比 -->
      <div class="sorted2">
        <div class="sortedChart sortedPie4" ref="sortedChartPie4"></div>
        <div class="sortedChart sortedPie5" ref="sortedChartPie5"></div>
        <div class="sortedChart sortedPie6" ref="sortedChartPie6"></div>
      </div>
      <!-- 总图表：柱状图、饼状图 -->
      <div class="total">
        <div class="totalChart totalBar" ref="totalChartBar"></div>
        <div class="totalChart totalPie" ref="totalChartPie"></div>
        <div class="totalChart totalLine" ref="totalChartLine"></div>
      </div>
    </div>
</div>
</template>

<script>
// 导入请求方法
import { getHistoryDetail } from '@/api/chart'
import dayjs from 'dayjs'
import store from '@/store'
export default {
  name: 'DashboardPage',
  data () {
    return {
      sections: [{ time: '', confidence_score: 0, text: '', bic: '', multicls: '', token: {}, img: '', description: '' }],
      // 获取得到的历史记录
      // sections: [
      //   { time: '2025-06-12T18:18:01', confidence_score: 0, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-12T18:18:01', confidence_score: 10, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-12T18:18:01', confidence_score: 15, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-12T18:18:01', confidence_score: 20, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-12T18:18:01', confidence_score: 21, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-12T14:18:01', confidence_score: 25, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T18:18:01', confidence_score: 31, text: '内容文本2025-04-03T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 45, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 50, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 55, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 58, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 60, text: '内容文本2025-04-02T02:18:01', bic: '真实', multicls: '篡改事实', token: {}, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 61, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 65, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 70, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-11T02:18:01', confidence_score: 78, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 80, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 86, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 90, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 93, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 100, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-09T02:18:01', confidence_score: 88, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 53, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T02:18:01', confidence_score: 67, text: '内容文本2025-04-01T02:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=cccccc', description: '注释' },
      //   { time: '2025-06-08T12:18:01', confidence_score: 34, text: '内容文本2025-04-03T12:18:01', bic: '虚假', multicls: '篡改事实', token: { 2: '文', 3: '本' }, img: 'https://iph.href.lu/300x200?fg=666666&bg=000000', description: '注释' }
      // ],
      // 分类后的历史记录
      filteredSections: {
        HalfHourSections: [],
        DaySections: [],
        WeekSections: []
      },
      // total的置信度分数
      score: [],
      // total的置信度划分区间（用于图表）
      scoreStats: {
        low: 0,
        mediumLow: 0,
        medium: 0,
        mediumHigh: 0,
        high: 0
      },
      // total的每日提交量
      dailyCountMap: {},
      // sorted的置信度分数
      score1: [],
      score2: [],
      score3: [],
      // sorted的置信度划分区间（用于图表）
      scoreStats1: {
        low: 0,
        mediumLow: 0,
        medium: 0,
        mediumHigh: 0,
        high: 0
      },
      scoreStats2: {
        low: 0,
        mediumLow: 0,
        medium: 0,
        mediumHigh: 0,
        high: 0
      },
      scoreStats3: {
        low: 0,
        mediumLow: 0,
        medium: 0,
        mediumHigh: 0,
        high: 0
      },
      // sorted的真实性
      truth1: [],
      truth2: [],
      truth3: [],
      // sorted的真实虚假数量（用于图表）
      truthStats1: {
        true: 0,
        false: 0
      },
      truthStats2: {
        true: 0,
        false: 0
      },
      truthStats3: {
        true: 0,
        false: 0
      }
    }
  },
  async created () {
    const res = await getHistoryDetail(store.getters.email)
    console.log(res)
    // 得到sections历史记录项
    this.sections = res.data.data
    // 得到三种分类的历史记录项
    this.filterSections(this.sections)
    // 得到total的置信度分数
    this.score = this.sections.map(item => item.confidence_score)
    // 得到sorted的置信度分数
    this.score1 = this.filteredSections.HalfHourSections.map(item => item.confidence_score)
    this.score2 = this.filteredSections.DaySections.map(item => item.confidence_score)
    this.score3 = this.filteredSections.WeekSections.map(item => item.confidence_score)
    // 得到total和sorted的置信度区间数量
    this.classifyScores()
    // 得到total的每日提交数
    this.sections.forEach(item => {
      const dateStr = item.time.slice(0, 10)
      if (this.dailyCountMap[dateStr]) {
        this.dailyCountMap[dateStr]++
      } else {
        this.dailyCountMap[dateStr] = 1
      }
    })
    // 得到sorted分三个时间的真实/虚假数组
    this.truth1 = this.filteredSections.HalfHourSections.map(item => item.bic)
    this.truth2 = this.filteredSections.DaySections.map(item => item.bic)
    this.truth3 = this.filteredSections.WeekSections.map(item => item.bic)
    // 得到sorted的真实/虚假数量
    this.classifyTruths()

    this.$nextTick(() => {
      this.initChart()
    })
  },
  mounted () {
    // 通过CDN加载 echarts 脚本
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js'
    script.onload = this.initChart // 启动图表初始化
    document.head.appendChild(script)
  },
  methods: {
    // 划分三种分类的历史记录项
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
    // 根据分数区间分数量
    classifyScores () {
      this.score.forEach(s => {
        if (s >= 0 && s <= 20) {
          this.scoreStats.low++
        } else if (s >= 21 && s <= 40) {
          this.scoreStats.mediumLow++
        } else if (s >= 41 && s <= 60) {
          this.scoreStats.medium++
        } else if (s >= 61 && s <= 80) {
          this.scoreStats.mediumHigh++
        } else if (s >= 81 && s <= 100) {
          this.scoreStats.high++
        }
      })
      this.score1.forEach(s => {
        if (s >= 0 && s <= 20) {
          this.scoreStats1.low++
        } else if (s >= 21 && s <= 40) {
          this.scoreStats1.mediumLow++
        } else if (s >= 41 && s <= 60) {
          this.scoreStats1.medium++
        } else if (s >= 61 && s <= 80) {
          this.scoreStats1.mediumHigh++
        } else if (s >= 81 && s <= 100) {
          this.scoreStats1.high++
        }
      })
      this.score2.forEach(s => {
        if (s >= 0 && s <= 20) {
          this.scoreStats2.low++
        } else if (s >= 21 && s <= 40) {
          this.scoreStats2.mediumLow++
        } else if (s >= 41 && s <= 60) {
          this.scoreStats2.medium++
        } else if (s >= 61 && s <= 80) {
          this.scoreStats2.mediumHigh++
        } else if (s >= 81 && s <= 100) {
          this.scoreStats2.high++
        }
      })
      this.score3.forEach(s => {
        if (s >= 0 && s <= 20) {
          this.scoreStats3.low++
        } else if (s >= 21 && s <= 40) {
          this.scoreStats3.mediumLow++
        } else if (s >= 41 && s <= 60) {
          this.scoreStats3.medium++
        } else if (s >= 61 && s <= 80) {
          this.scoreStats3.mediumHigh++
        } else if (s >= 81 && s <= 100) {
          this.scoreStats3.high++
        }
      })
    },
    // 分出真实/虚假个数
    classifyTruths () {
      this.truth1.forEach(s => {
        if (s === '虚假') {
          this.truthStats1.false++
        } else {
          this.truthStats1.true++
        }
      })
      this.truth2.forEach(s => {
        if (s === '虚假') {
          this.truthStats2.false++
        } else {
          this.truthStats2.true++
        }
      })
      this.truth3.forEach(s => {
        if (s === '虚假') {
          this.truthStats3.false++
        } else {
          this.truthStats3.true++
        }
      })
    },
    // 渲染图表
    initChart () {
      // sorted的饼状图1（30分钟内）
      this.initSortedChartPie1()
      // sorted的饼状图2（今日内）
      this.initSortedChartPie2()
      // sorted的饼状图3（前7天）
      this.initSortedChartPie3()
      // sorted的饼状图4（30分钟内）
      this.initSortedChartPie4()
      // sorted的饼状图5（今日内）
      this.initSortedChartPie5()
      // sorted的饼状图6（前7天）
      this.initSortedChartPie6()
      // total的柱状图
      this.initTotalChartBar()
      // total的饼状图
      this.initTotalChartPie()
      // total的折线图
      this.initTotalChartLine()
    },
    // sortedChartPie1
    initSortedChartPie1 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie1)
      // 文本: x轴 / 饼状图项
      const categories = ['真实', '虚假']
      // 区间说明
      const ranges = ['真实', '虚假']
      // 对应区间数量
      const values = [
        this.truthStats1.true,
        this.truthStats1.false
      ]
      const colors = ['#8ac926', '#ff595e']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '30分钟内真实/虚假比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '真实/虚假比例',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // sortedChartPie2
    initSortedChartPie2 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie2)
      // 文本: x轴 / 饼状图项
      const categories = ['真实', '虚假']
      // 区间说明
      const ranges = ['真实', '虚假']
      // 对应区间数量
      const values = [
        this.truthStats2.true,
        this.truthStats2.false
      ]
      const colors = ['#8ac926', '#ff595e']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '今日内真实/虚假比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '真实/虚假比例',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // sortedChartPie3
    initSortedChartPie3 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie3)
      // 文本: x轴 / 饼状图项
      const categories = ['真实', '虚假']
      // 区间说明
      const ranges = ['真实', '虚假']
      // 对应区间数量
      const values = [
        this.truthStats3.true,
        this.truthStats3.false
      ]
      const colors = ['#8ac926', '#ff595e']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '前7天真实/虚假比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '真实/虚假比例',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // sortedChartPie4
    initSortedChartPie4 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie4)
      // 文本: x轴 / 饼状图项
      const categories = ['极低', '较低', '中等', '较高', '极高']
      // 区间说明
      const ranges = ['[0-20]', '(20-40]', '(40-60]', '(60-80]', '(80-100]']
      // 对应区间数量
      const values = [
        this.scoreStats1.low,
        this.scoreStats1.mediumLow,
        this.scoreStats1.medium,
        this.scoreStats1.mediumHigh,
        this.scoreStats1.high
      ]
      const colors = ['#ffdc5e', '#ffbe0b', '#ff6d00', '#e5383b', '#a4161a']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '30分钟内虚假程度占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '置信度区间',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // sortedChartPie5
    initSortedChartPie5 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie5)
      // 文本: x轴 / 饼状图项
      const categories = ['极低', '较低', '中等', '较高', '极高']
      // 区间说明
      const ranges = ['[0-20]', '(20-40]', '(40-60]', '(60-80]', '(80-100]']
      // 对应区间数量
      const values = [
        this.scoreStats2.low,
        this.scoreStats2.mediumLow,
        this.scoreStats2.medium,
        this.scoreStats2.mediumHigh,
        this.scoreStats2.high
      ]
      const colors = ['#ffdc5e', '#ffbe0b', '#ff6d00', '#e5383b', '#a4161a']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '今日内虚假程度占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '置信度区间',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // sortedChartPie6
    initSortedChartPie6 () {
      const chart2 = window.echarts.init(this.$refs.sortedChartPie6)
      // 文本: x轴 / 饼状图项
      const categories = ['极低', '较低', '中等', '较高', '极高']
      // 区间说明
      const ranges = ['[0-20]', '(20-40]', '(40-60]', '(60-80]', '(80-100]']
      // 对应区间数量
      const values = [
        this.scoreStats3.low,
        this.scoreStats3.mediumLow,
        this.scoreStats3.medium,
        this.scoreStats3.mediumHigh,
        this.scoreStats3.high
      ]
      const colors = ['#ffdc5e', '#ffbe0b', '#ff6d00', '#e5383b', '#a4161a']
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: '前7天虚假程度占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          show: false
          // orient: 'vertical',
          // left: 'left'
        },
        series: [
          {
            name: '置信度区间',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // totalChartBar
    initTotalChartBar () {
      // 柱状图chart1
      const chart1 = window.echarts.init(this.$refs.totalChartBar)
      // x轴文本
      const categories = ['极低', '较低', '中等', '较高', '极高']
      // 区间说明
      const ranges = ['[0-20]', '(20-40]', '(40-60]', '(60-80]', '(80-100]']
      // 对应区间数量
      const values = [
        this.scoreStats.low,
        this.scoreStats.mediumLow,
        this.scoreStats.medium,
        this.scoreStats.mediumHigh,
        this.scoreStats.high
      ]
      const option1 = {
        title: {
          text: '虚假程度柱状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const index = params[0].dataIndex
            return `${categories[index]}<br/>区间: ${ranges[index]}<br/>数量: ${values[index]}`
          }
        },
        xAxis: {
          type: 'category',
          data: categories
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.scoreStats.low,
                itemStyle: {
                  color: '#ffdc5e'
                }
              },
              {
                value: this.scoreStats.mediumLow,
                itemStyle: {
                  color: '#ffbe0b'
                }
              },
              {
                value: this.scoreStats.medium,
                itemStyle: {
                  color: '#ff6d00'
                }
              },
              {
                value: this.scoreStats.mediumHigh,
                itemStyle: {
                  color: '#e5383b'
                }
              },
              {
                value: this.scoreStats.high,
                itemStyle: {
                  color: '#a4161a'
                }
              }
            ],
            type: 'bar'
          }
        ]
      }
      chart1.setOption(option1)
    },
    // totalChartPie
    initTotalChartPie () {
      const chart2 = window.echarts.init(this.$refs.totalChartPie)
      // 文本: x轴 / 饼状图项
      const categories = ['极低', '较低', '中等', '较高', '极高']
      // 区间说明
      const ranges = ['[0-20]', '(20-40]', '(40-60]', '(60-80]', '(80-100]']
      // 对应区间数量
      const values = [
        this.scoreStats.low,
        this.scoreStats.mediumLow,
        this.scoreStats.medium,
        this.scoreStats.mediumHigh,
        this.scoreStats.high
      ]
      const colors = ['#ffdc5e', '#ffbe0b', '#ff6d00', '#e5383b', '#a4161a']
      const total = values.reduce((sum, val) => sum + val, 0)
      const pieData = values.map((val, idx) => ({
        value: val,
        name: categories[idx],
        itemStyle: { color: colors[idx] }
      }))
      const option = {
        title: {
          text: `虚假程度区间占比（共 ${total} 条）`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const range = ranges[params.dataIndex] // 获取当前数据项的对应区间
            return `${range}<br/>数量: ${params.value}<br/>占比: ${params.percent}%` // 自定义显示格式
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '置信度区间',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            data: pieData,
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      }
      chart2.setOption(option)
    },
    // totalChartLine
    initTotalChartLine () {
      const chart = window.echarts.init(this.$refs.totalChartLine)
      // 首先整理 x 轴和 y 轴数据
      const dates = Object.keys(this.dailyCountMap).sort() // 按日期排序
      // x轴显示格式改为 "M月D日"
      const xData = dates.map(dateStr => dayjs(dateStr).format('M月D日'))
      const yData = dates.map(dateStr => this.dailyCountMap[dateStr])

      const option = {
        title: {
          text: '每日检测数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value',
          min: 0
        },
        series: [
          {
            name: '检测数量',
            type: 'line',
            data: yData,
            smooth: true,
            lineStyle: { width: 3, color: '#3598fb' },
            itemStyle: { color: '#3598fb' }
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.wrapper{
  /* 设置版心高度（可删掉改为内容撑开） */
  min-height: calc(100vh - 156px);
  height: auto;
  margin-bottom: 40px;
  /* 内边距 */
  padding: 45px 50px 20px;
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
  right: 70px;
  pointer-events: none;
}
.decoration img{
  width: 130px;
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
    transform: rotate(6deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-6deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

/* 图表展示区 */
.showCharts{
  width: 100%;
  margin-top: 40px;
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
/* 分图表 */
.sorted1{
  width: 100%;
  padding: 0 150px;
  /* border: 1px solid #ff0000; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sorted2{
  width: 100%;
  padding: 0 80px;
  /* border: 1px solid #ff0000; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sorted1 .sortedChart,
.sorted2 .sortedChart{
  width: 330px;
  height: 260px;
  margin: 0 6px;
  padding-top: 20px;
  border: 1.5px solid #7fbffe;
  border-radius: 3px;
}
.sortedChart.sortedPie1,
.sortedChart.sortedPie2,
.sortedChart.sortedPie3{
  margin-bottom: 10px;
}
.sortedChart.sortedPie4,
.sortedChart.sortedPie5,
.sortedChart.sortedPie6{
  width: 360px;
}
/* 总图表 */
.total{
  width: 100%;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total .totalChart{
  width: 500px;
  height: 330px;
  padding-top: 45px;
  margin: 0 5px;
  border: 1.5px solid #7fbffe;
  border-radius: 3px;
}
</style>

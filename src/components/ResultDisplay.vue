<!-- 检测页的结果展示 -->
<template>
  <div class="resultDisplay"
  :class="{'visible': isVisible}"
  @mouseenter="$emit('child-hover', true)"
  @mouseleave="$emit('child-hover', false)">
    <!-- 单页内容 -->
    <div class="resultPage"
    ref="resultPage"
    v-for="(item, index) in result.bic"
    :key="index"
    v-show="index === currentPage - 1">
      <!-- 头部 -->
      <div class="left">
        <!-- 图片：使用el-image自定义图片 -->
        <div class="result-img">
          <el-image
          :src="result.images[index]"
          fit="cover"
          :preview-src-list="result.images">
            <!-- 图片加载失败时的加载内容 -->
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
              <span>无图片</span>
            </div>
          </el-image>
        </div>
        <!-- 错误字段 -->
        <p>文本内容</p>
        <div class="result-content" v-html="highlightedText(index)"></div>
      </div>
      <!-- 内容 -->
      <div class="right">
        <!-- 评估部分 -->
        <div class="assess">
          <!-- 真实性 -->
          <div class="single-assess">
            检测结果：<span :class="{'correct': item === '真实'}">{{ item }}</span>
          </div>
          <!-- 置信度 -->
          <div class="score-assess">
            置信度：<span>{{ result.confidence_scores[index] }}</span>
          </div>
          <!-- 错误类型 -->
          <div class="multi-assess" v-if="item === '虚假'">
            错误类型：<span>{{ result.multicls[index] }}</span>
          </div>
        </div>
        <!-- 描述： -->
        <p>错误说明</p>
        <div class="result-description">
          {{ result.description[index] }}
        </div>
      </div>
      <!-- 退出按钮 -->
      <div class="button btn-close" @click="handleVisible">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <!-- 分页组件 -->
    <div class="pagination-wrapper" v-if="result.bic.length >= 1">
      <el-pagination
        small
        background
        :current-page="currentPage"
        :page-size="1"
        :total="result.bic.length"
        layout="prev, pager, next"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultDisplay',
  props: {
    // 结果对象（包含图片、正误、错误位置、描述）
    result: {
      type: Object,
      required: true
    },
    // 原始文本
    text: {
      type: Array
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1 // 当前页码
      // result: {
      //   bic: ['虚假', '虚假'],
      //   multicls: ['脸部特征被修改', '脸部被替换&文本特征被修改'],
      //   token: [{}, { 19: '举', 20: '手', 21: '抗', 22: '议' }],
      //   images: [require('@/assets/result1.png'), require('@/assets/result2.png')],
      //   description: [
      //     '视频中的演讲的人物脸部动作生硬不自然，图片中的面部被红色方框标记出来，表明该图片可能经过了编辑或篡改。具体来说，图片中被标记的面部看起来像是经过了合成或替换处理，而不是原始照片的一部分。这种类型的虚假信息通常涉及图像编辑技术，例如使用图像编辑软件将一个人的脸部替换到另一个人身上。这种编辑可以用来制造假新闻或传播虚假信息，以误导观众，掩盖其真实来源或意图欺骗观众。',
      //     '结合人物的神态、姿势以及现场环境氛围，将这位女士的行为描述为“抗议”是与图像内容明显矛盾的，因此“抗议”这一说法极有可能是虚假信息。这个场景更像是支持者在活动中表达激动或赞赏。而且略显“用力”的表情，不太自然的脸部，极可能是被修改过的人脸，配合“虚假新闻内容”来误导观众。'
      //   ],
      //   confidence_scores: 85.4
      // },
      // text: ['你只需在这个国家的公共平台上，泼足够多的脏水，各种质疑，各种谬传，丢出足量的阴谋论，这样一来公众都不知道该相信什么', '洛杉矶的吉赛尔·夏皮罗在华盛顿纪念碑前举手抗议，她正在听奥巴马总统的讲话']
    }
  },
  methods: {
    // 组件通信修改isVisible为false
    handleVisible () {
      this.$emit('update', false)
    },
    // 提取出错误的文字，添加span标签
    highlightedText (num) {
      if (!this.result.token[num]) return this.text[num]
      return (this.text[num] || '').split('').map((char, index) => {
        return this.result.token[num][String(index)] ? `<span class="error">${char}</span>` : char
      }).join('')
    },
    // 分页切换
    handlePageChange (newPage) {
      this.currentPage = newPage
    }
  },
  // 判断是否撑开，添加not-overflow类名
  mounted () {
    this.$nextTick(() => {
      const elements = this.$refs.resultPage
      if (!elements) return
      // 如果是数组（多个 ref）
      if (Array.isArray(elements)) {
        elements.forEach(el => {
          if (!el) return
          if (el.scrollHeight <= el.clientHeight) {
            el.classList.add('not-overflow')
          } else {
            el.classList.remove('not-overflow')
          }
        })
      } else {
        // 如果是单个元素
        const el = elements
        if (el.scrollHeight <= el.clientHeight) {
          el.classList.add('not-overflow')
        } else {
          el.classList.remove('not-overflow')
        }
      }
    })
  }
}
</script>

<style scoped>
/* 整体页面样式 */
.resultDisplay {
  /* 固定定位 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: calc(100vh - 154px);
  margin-top: 39px;
  /* 主背景色 */
  background-color: rgb(255, 255, 255);
  box-sizing: content-box;
  /* border: 5px solid #40a9ff; */
  box-shadow: 0 0 18px 6px rgba(0, 106, 255, 0.5);
  box-shadow: 0 0 18px 7px rgba(0, 106, 255, 0.5);
  /* border-radius: 14px; */
  font-size: 20px;
  color: black;
  z-index: 99999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s;
}
.resultDisplay.visible{
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease-in-out;
}

/* 右上角退出按钮样式 */
.button {
  width: 50px;
  height: 50px;
  /* 按钮绝对定位 */
  /* position: absolute; */
  position: fixed;
  right: 20px;
  top: 10px;
  z-index: 999;
}
.button i {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 40px;
  font-weight: bold;
  transition: all 0.3s;
  padding: 5px;
}
.button.btn-close{
  color: #000;
  color: #0d8aff;
  transition: all 0.3s;
}
.button.btn-close:hover{
  box-shadow: 0px 0px 0px 4px #0d8aff;
  border-radius: 5px;
}

/* 分页组件 */
.pagination-wrapper {
  position: absolute;
  left: 50%;
  bottom: -35px;
  bottom: 3px;
  transform: translate(-50%, 0);
  z-index: 999;
}
/* 修改组件内背景色 */
.pagination-wrapper .el-pagination{
  background-color: #21212185;
  box-shadow: 0 0 5px #3d3d3dde;
  border-radius: 5px;
  padding: 5px 5px 0;
}
.pagination-wrapper .el-pagination ::v-deep button{
  background-color: #fefefe;
  color: black;
  transition: all 0.3s;
}
.pagination-wrapper .el-pagination ::v-deep button:not(:disabled):hover{
  background-color: #dadada;
}
.pagination-wrapper .el-pagination ::v-deep button:disabled{
  color: #7d7d7d;
}
.pagination-wrapper .el-pagination ::v-deep button i::before{
  font-size: 14px;
}
.pagination-wrapper .el-pagination ::v-deep .el-pager li{
  background-color: #fefefe;
  font-size: 14px;
  font-weight: 500;
  color: black;
  font-family: 'Segoe UI', 'Verdana', 'sans-serif';
  transition: all 0.3s;
}
.pagination-wrapper .el-pagination ::v-deep .el-pager li:not(.active):hover{
  color: rgb(0, 183, 255);
  color: #40a9ff;
  background-color: #dadada;
}
.pagination-wrapper .el-pagination ::v-deep .el-pager li:not(.disabled).active{
  background-color: rgb(75, 204, 255);
  background-color: #40a9ff;
}

/* 右侧滚动框样式 */
/* 作用于滚动容器，比如 .resultContent */
.resultPage::-webkit-scrollbar {
  width: 10px; /* 滚动条宽度 */
}
/* 滚动条轨道 */
.resultPage::-webkit-scrollbar-track {
  background: #f0f0f0; /* 轨道颜色 */
  border-radius: 5px;
}
/* 滚动条滑块 */
.resultPage::-webkit-scrollbar-thumb {
  background-color: #40a9ff; /* 滑块颜色 */
  background-color: #2fa1ff;
  border-radius: 5px;
  border: 2px solid #f0f0f0; /* 滑块与轨道之间的缝隙 */
  border-top-width: 1.5px;
  border-bottom-width: 1.5px;
}
.resultPage::-webkit-scrollbar-thumb:hover {
  background-color: #138dff;
}

/* 单篇结果布局 */
.resultPage{
  width: 100%;
  height: calc(100% - 54px);
  padding: 20px 60px 0px 70px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  overflow-y: auto;
  overflow-x: hidden;
}
.resultPage.not-overflow{
  padding-top: 100px;
}
.resultPage::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1.5px;
  height: 88%;
  margin-top: -15px;
  background-color: #ccc;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.left{
  flex: 0 0 calc(50% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  /* border-right: 1px solid #000; */
}

/* 图片 */
.result-img{
  width: 75%;
  aspect-ratio: 4 / 3;
  aspect-ratio: 16 / 10;
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
  background-color: #eeeeee;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 15px rgba(100, 190, 255, 0.853);
}
.result-img:hover{
  transform: scale(1.02);
  box-shadow: 0 0 25px rgb(63, 175, 255);
}
.result-img .el-image{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 图片加载失败的占位内容 */
.result-img ::v-deep .image-slot{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.result-img .image-slot i{
  font-size: 36px;
  color: #46494e;
  color: #3c3e40;
}
.result-img .image-slot span{
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #46494e;
  color: #3c3e40;
}

/* 文本内容部分 */
.result-content {
  width: 90%;
  margin-bottom: 18px;
  padding-bottom: 15px;
  font-size: 20px;
  color: #000;
  line-height: 1.35;
  letter-spacing: 1px;
  text-align: left;
  text-indent: 42px;
  word-break: break-word;
}
/* 错误文本 */
::v-deep .result-content span.error{
  font-size: 1em;
  color: red;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2.5px;
}

/* 右侧部分 */
.right{
  /* background-color: #a5d2fe9e; */
  flex: 0 0 calc(50% - 20px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 25px;
  /* border-left: 1px solid #000; */
}

/* 评估部分 */
.assess{
  align-self: center;
  height: 275px;
  width: 441px;
  margin-left: -30px;
  /* border: 5px dotted #40a9ff; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-left: 20px;
}
.single-assess {
  font-size: 40px;
  font-weight: bold;
  white-space: nowrap;
  padding-right: 10px;
}
.single-assess span{
  color: red;
}
.single-assess span.correct{
  color: rgb(3, 235, 3);
}
.score-assess {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  /* margin-top: 25px; */
  white-space: wrap;
  padding-right: 10px;
}
.score-assess span{
  font-size: 30px;
  color: rgb(33, 133, 255);
}
.multi-assess {
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  white-space: wrap;
  padding-right: 10px;
}
.multi-assess span{
  color: rgb(255, 157, 0);
}
.single-assess,
.score-assess,
.multi-assess {
  text-shadow: 2px 2px 3px rgba(100, 180, 255, 0.5);
  border-bottom: 2.5px solid #40a9ff;
  transition: all 0.2s;
}
.single-assess:hover,
.score-assess:hover,
.multi-assess:hover {
  text-shadow: 2px 2px 3px rgba(0, 128, 255, 0.65);
  transform: scale(1.02);
  /* color: #007bff; */
  cursor: default;
  border-bottom: 3.5px solid #40a9ff;
}

/* 描述说明部分 */
.left p,
.right p{
  align-self: center;
  margin-top: 30px;
  margin-bottom: 16px;
  display: inline-block;
  padding: 2px 25px;
  color: #35a4ff;
  font-weight: bold;
  border: 2.5px solid #40a9ffbe;
}
.result-description{
  width: 95%;
  align-self: center;
  font-size: 20px;
  color: #ffffffde;
  color: #ffffff85;
  color: #000;
  line-height: 1.45;
  text-align: left;
  text-indent: 38.8px;
  word-break: break-word;
  letter-spacing: 0.7px;
}

/* 流式输出效果 */
.result-content {
  font-family: 'Fira Code', monospace;
  opacity: 0;
  overflow: hidden;
  animation: type 1.5s steps(25,end) forwards;
}
.result-description {
  font-family: 'Fira Code', monospace;
  opacity: 0;
  overflow: hidden;
  animation: type 1.5s steps(25,end) 1.5s forwards;
}
@keyframes type {
  0% {
    opacity: 0;
    width: 0;
  }
  1%{
    border-right: 1.5px solid #40a9ff;
    opacity: 1;
  }
  99%{
    border-right: 1.5px solid #40a9ff;
    opacity: 1;
  }
  100%{
    border-right: none;
    opacity: 1;
  }
}
</style>

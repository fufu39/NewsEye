<!-- 历史记录页的详情展示 -->
<template>
  <div class="resultDisplay" :class="{'visible': isVisible}">
    <!-- 单页内容 -->
    <div class="resultPage">
      <!-- 头部 -->
      <div class="header">
        <!-- 图片：使用el-image自定义图片 -->
        <div class="result-img">
          <el-image :src="result.img" fit="cover" :preview-src-list="[result.img]">
            <!-- 图片加载失败时的加载内容 -->
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
              <span>无图片</span>
            </div>
          </el-image>
        </div>
        <!-- 评估部分 -->
        <div class="assess">
          <!-- 真实性 -->
          <div class="single-assess">
            检测结果：<span>{{ result.bic }}</span>
          </div>
          <!-- 错误类型 -->
          <div class="multi-assess">
            原因：<span>{{ result.multicls }}</span>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 错误字段 -->
        <p>文本</p>
        <div class="result-content" v-html="highlightedText()"></div>
        <!-- 描述： -->
        <p>注释</p>
        <div class="result-description">
          {{ result.description }}
        </div>
      </div>
      <!-- 退出按钮 -->
      <div class="button btn-close" @click="handleVisible">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultHistoryDisplay',
  props: {
    // 结果对象（包含图片、正误、错误位置、描述）
    result: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // 组件通信修改isVisible为false
    handleVisible () {
      this.$emit('update', false)
    },
    // 提取出错误的文字，添加span标签
    highlightedText () {
      if (!this.result.token) return this.result.text
      return (this.result.text || '').split('').map((char, index) => {
        return this.result.token[String(index)] ? `<span class="error">${char}</span>` : char
      }).join('')
    }
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
  width: 50vw;
  height: 75vh;
  margin-top: 39px;
  /* 主背景色 */
  background-color: rgb(50, 50, 50);
  font-size: 20px;
  color: white;
  box-shadow: 0 0 1px 5px #000;
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
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
}
.button i {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-size:40px;
  transition: all 0.4s;
  padding: 5px;
}
.button.btn-close{
  color: #fff;
  transition: all 0.5s;
}
.button.btn-close:hover{
  box-shadow: 0px 0px 0px 3px #fff;
}

/* 单篇结果布局 */
.resultPage{
  position: relative;
  width: 100%;
  height: 75vh;
  padding: 20px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
}
.header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 30px;
}
/* 图片 */
.result-img{
  width: 24vw;
  height: 16vw;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ccc;
  box-shadow: 0 0 8px rgb(255, 255, 255, 0.4);
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
}
.result-img .image-slot span{
  font-size: 13px;
  color: #46494e;
}

/* 评估部分 */
.assess{
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1; /* 占据剩余空间 */
}
.single-assess {
  padding: 8px 0px;
  font-size: 35px;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 20px;
}
.single-assess span{
  color: red;
}
.multi-assess {
  font-size: 24px;
  white-space: nowrap;
}
.multi-assess span{
  color: rgb(255, 179, 57);
}

/* 内容部分 */
.content{
  background-color: #5d5d5dd6;
  background-color: #5f656aa9;
  width: 100%;
  border-radius: 10px;
  margin-top: 5px;
  padding: 10px 18px 15px;
}
.content p{
  display: inline-block;
  padding: 0px 8px;
  border: 2px solid #fff;
  /* font-size: 16px; */
}
.content p:nth-of-type(1){
  font-size: 20px;
  margin-bottom: 4px;
}
.content p:nth-of-type(2){
  font-size: 20px;
  margin-bottom: 6px;
}
.result-content {
  width: 100%;
  margin-bottom: 18px;
  padding-bottom: 15px;
  font-size: 20px;
  color: #fff;
  line-height: 1.35;
  letter-spacing: 1px;
  text-align: left;
  text-indent: 42px;
  word-break: break-word;
  border-bottom: 3px dotted #6c747ec3;
}
/* 错误文本 */
::v-deep .result-content span.error{
  font-size: 1em;
  color: red;
  text-decoration:line-through;
}
.result-description{
  width: 100%;
  font-size: 18px;
  color: #ffffffde;
  color: #ffffff85;
  line-height: 1.45;
  text-align: left;
  text-indent: 38.8px;
  word-break: break-word;
  letter-spacing: 0.7px;
}
</style>

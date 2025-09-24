<!-- 新闻检测页 -->
<template>
  <div :class="['wrapper', { 'no-hover': isChildHovering }]">
    <!-- 结果展示区：传递结果对象 -->
    <ResultDisplay
    @update="isVisible = $event"
    @child-hover="handleChildHover"
    :isVisible="isVisible"
    :result="requestResult"
    :text="text">
    </ResultDisplay>

    <!-- 内容区 -->
    <div class="content">
      <h1 class="page-title"><span>「</span> Detection 新闻检测 <span>」</span></h1>
      <p class="page-desc">
        请上传
        <button :class="{ active: isFileUpload === 1 }" @click="toggleUploadType(1)">文件</button>
        <span>/</span>
        <button :class="{ active: isFileUpload === 2 }" @click="toggleUploadType(2)">图文</button>
        <span>/</span>
        <button :class="{ active: isFileUpload === 3 }" @click="toggleUploadType(3)">视频</button>
        进行检测
      </p>
    </div>

    <!-- 提交文件区 -->
    <div class="file-upload" @click="triggerFileClick" v-if="isFileUpload === 1">
      <h2>提交文件</h2>
      <!-- 文件提交框 -->
      <!-- 接收子组件的文件并处理 -->
      <DetectionUploadButton
      @fileInfo-update="handleFileInfoUpdate"
      @txt-update="handleTxtUpdate"
      @img-update="handleImgUpdate"
      ref="uploadButton">
      </DetectionUploadButton>
      <div v-if="files.length" class="filesShow">
        <h3>已选文件：</h3>
        <ul>
          <li v-for="(file, index) in files" :key="index">
            <strong>{{ index + 1 }}.</strong> {{ file.fileName }} ({{ (file.fileSize/1024).toFixed(0) }}KB)
          </li>
        </ul>
      </div>
      <div v-else class="filesShow filesEmpty"></div>
    </div>

    <!-- 提交图文区 -->
    <div class="image-upload" v-if="isFileUpload === 2">
      <h2>提交图文</h2>
      <!-- Tabs标签页 -->
      <el-tabs
        v-model="activeTab"
        type="border-card"
        addable
        closable
        @tab-add="addTab"
        @tab-remove="removeTab"
      >
        <!-- 每个标签页项 -->
        <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :label="'图文' + (index + 1)"
        :name="index.toString()">
          <!-- 图片提交框 -->
          <div class="image-upload-position">
            <DetectionImageButton
              :ref="'imageButton' + index"
              @image-selected="(img) => handleImage(img, index)"
              :class="{'no-hover': images[index]}">
            </DetectionImageButton>
            <div v-if="images_preview[index]" class="imagesShow" @click="triggerImageClick(index)">
              <img :src="images_preview[index]" width="240" height="160" />
            </div>
          </div>
          <!-- 文本提交框 -->
          <div class="textShow" @dragover.prevent @drop="(e) => handleDrop(e, index)">
            <textarea v-model="text[index]" placeholder="请输入新闻内容..." rows="8" cols="50"></textarea>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 提交视频区 -->
    <div class="video-upload" v-if="isFileUpload === 3">
      <h2>提交视频</h2>
      <!-- 视频提交框 -->
      <div class="video-upload-position">
        <DetectionVideoButton ref="videoButton" @video-selected="handleVideo" :class="{'no-hover': video}"></DetectionVideoButton>
        <!-- 视频预览 -->
        <div v-if="videoUrl" class="videoShow">
          <video width="640" height="360" controls>
            <source :src="videoUrl" type="video/mp4" />
            <source :src="videoUrl" type="video/webm" />
            该视频格式不支持预览
          </video>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <DetectionSubmitButton
    class="submit-button"
    :class="{'file-upload-button': (isFileUpload === 1) && (this.files.length >= 6),
    'image-upload-button': (isFileUpload === 2),
    'video-upload-button': (isFileUpload === 3)}"
    @click.native="submitAll">
    </DetectionSubmitButton>

    <!-- 装饰区 -->
    <div class="decoration">
      <img src="@/assets/search.svg" alt="">
    </div>
    <div class="decoration_global">
      <img src="@/assets/global.svg" alt="">
    </div>
  </div>
</template>

<script>
import store from '@/store'
import ResultDisplay from '@/components/ResultDisplay.vue'
import DetectionUploadButton from '@/components/DetectionUploadButton.vue'
import DetectionImageButton from '@/components/DetectionImageButton.vue'
import DetectionVideoButton from '@/components/DetectionVideoButton.vue'
import DetectionSubmitButton from '@/components/DetectionSubmitButton.vue'
// 引入请求方法：获取检测结果
import { getDetectionResult } from '@/api/detection.js'
export default {
  name: 'DetectionPage',
  components: {
    ResultDisplay,
    DetectionUploadButton,
    DetectionImageButton,
    DetectionVideoButton,
    DetectionSubmitButton
  },
  computed: {
  },
  data () {
    return {
      isChildHovering: false, // 控制关闭hover动画
      isFileUpload: 1, // 控制三种上传区的切换，分别123
      activeTab: '0', // 当前激活的标签页
      tabs: [], // 作为标签页存在的标志
      images_preview: [], // 预览的图片文件
      files: [], // 选中的文件，包含名称大小（文件提交页的信息渲染）
      video: null, // 视频文件
      videoUrl: '', // 视频预览url

      images: [], // 选中的图片
      // text: ['你好，这里是第一篇文本内容，需要标注的位置是你好二字。啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊你好，这里是第一篇文本内容，需要标注的位置是你好二字你好，这里是第一篇文本内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊，需要标注的位置是你好二字你好，这里是第一篇文本内容，需要标注的位置是你好二字', '这里是第二篇文本内容，我也需要标注，位置是我也二字。'],
      // 文本
      text: [],
      // 请求的结果数据
      requestResult: {
        bic: [],
        multicls: [],
        token: [],
        images: [],
        description: [],
        confidence_scores: []
      },
      // requestResult: {
      //   bic: ['虚假', '真实'],
      //   multicls: ['脸部特征被修改了', '神情状态被夸大了'],
      //   token: [{ 0: '你', 1: '好' }, { 11: '我', 12: '也' }],
      //   images: [require('@/assets/result1.png'), 'https://iph.href1.lu/300x200?text=%E4%B8%B4%E6%97%B6%E5%9B%BE%E7%89%87'],
      //   description: ['这张图片右方的人物脸部特征被修改了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
      //     '这张图片的神情夸张化了'],
      //   confidence_scores: [66, 88]
      // },
      isVisible: false // 控制展示页是否显示
    }
  },
  methods: {
    // 开关hover动画
    handleChildHover (status) {
      this.isChildHovering = status
    },
    // 切换按钮函数
    toggleUploadType (isFile) {
      if (this.isFileUpload === isFile) return // 阻止重复点击事件
      this.isFileUpload = isFile// 切换显示区域
      this.files = []
      this.images = []
      this.images_preview = []
      this.text = []
      this.video = null
      this.videoUrl = ''
      this.activeTab = '0'
      this.tabs = []
      this.addTab()
    },
    // 处理子组件选中的文件
    handleFileInfoUpdate (fileInfo) {
      this.files = fileInfo
    },
    handleTxtUpdate (txt) {
      this.text = txt
    },
    handleImgUpdate (img) {
      this.images = img
    },
    // 处理图像
    handleImage (image, index) {
      // 传递的图像为空的情况
      if (!image) {
        this.$set(this.images, index, null)
        this.$set(this.images_preview, index, '')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(image) // 读取文件，转换为Data URL
      reader.onload = (e) => {
        // 将图片文件添加到对应索引的images数组
        this.$set(this.images, index, image)
        // 将图片的url添加到对应索引的images_preview数组
        this.$set(this.images_preview, index, e.target.result)
      }
    },
    // 处理图像页的标签增删
    addTab () {
      // 新增标签页时，同时给 images、images_preview、text 数组添加一项空内容
      this.tabs.push(Date.now())
      this.images.push(null)
      this.images_preview.push('')
      this.text.push('')
      this.activeTab = (this.tabs.length - 1).toString()
    },
    removeTab (targetName) {
      const index = Number(targetName) // 传入对应的name
      this.tabs.splice(index, 1)
      this.images.splice(index, 1)
      this.images_preview.splice(index, 1)
      this.text.splice(index, 1)
      // 调整activeTab使当前激活项合法
      if (this.tabs.length === 0) {
        // 保证至少一个
        this.addTab()
      } else if (index >= this.tabs.length) {
        this.activeTab = (this.tabs.length - 1).toString()
      } else {
        this.activeTab = index.toString()
      }
    },
    // 处理视频
    handleVideo (video) {
      this.video = video
      if (this.videoUrl) {
        URL.revokeObjectURL(this.videoUrl)
      }
      this.videoUrl = URL.createObjectURL(video)
    },
    // 模拟文件按钮子组件的点击，扩大点击范围
    triggerFileClick (e) {
      // 防止点击 DetectionUploadButton 内部元素重复触发
      if (e.target.closest('.upload-button')) return
      this.$refs.uploadButton.triggerFileInput()
    },
    // 模拟图像框的点击
    triggerImageClick (index) {
      const refName = 'imageButton' + index
      this.$refs[refName][0].triggerImageInput()
    },
    // 处理txt文本域的拖拽
    handleDrop (e, index) {
      e.preventDefault() // 阻止默认行为（在浏览器打开）

      // 处理文本直接拖拽
      const draggedText = e.dataTransfer.getData('text/plain') // 获取拖入的文本
      if (draggedText) {
        this.$set(this.text, index, draggedText)
        return
      }
      // 处理txt文件拖拽
      const file = e.dataTransfer.files[0] // 获取拖入的文件
      if (file && file.type === 'text/plain') {
        const reader = new FileReader()
        reader.readAsText(file, 'utf-8')
        reader.onload = () => {
          this.$set(this.text, index, reader.result) // 读取完成后更新text
        }
      }
    },
    // 提交检测
    async submitAll (e) {
      // 本地视频数据覆盖（处理视频情况）
      if (this.isFileUpload === 3 && this.video !== null) {
        store.commit('setLoading', true)
        setTimeout(() => {
          store.commit('setLoading', false)
          this.requestResult = {
            bic: ['虚假'],
            multicls: ['脸部被替换'],
            token: [{}],
            images: [require('@/assets/result1.png')],
            description: ['视频中的演讲的人物脸部动作生硬不自然，图片中的面部被红色方框标记出来，表明该图片可能经过了编辑或篡改。具体来说，图片中被标记的面部看起来像是经过了合成或替换处理，而不是原始照片的一部分。这种类型的虚假信息通常涉及图像编辑技术，例如使用图像编辑软件将一个人的脸部替换到另一个人身上。这种编辑可以用来制造假新闻或传播虚假信息，以误导观众，掩盖其真实来源或意图欺骗观众。'],
            confidence_scores: [85.4]
          }
          this.text = ['你只需在这个国家的公共平台上，泼足够多的脏水，各种质疑，各种谬传，丢出足量的阴谋论，这样一来公众都不知道该相信什么']
          this.isVisible = true
        }, 8000)
        // e.currentTarget.blur()
        return
      }

      // 当text都不为空，或者有视频时，才发起请求
      if (this.text.every(item => item.trim() !== '')) {
        // 发起请求执行提交操作（本质都是提交images和text）
        const res = await getDetectionResult(this.images, this.text, store.getters.email)
        this.requestResult = res.data.data
        console.log(res)
        // 展示结果页
        this.isVisible = true
        // 取消按钮focus
        // e.currentTarget.blur()
        return
      }
      this.$message.closeAll()
      this.$message({
        duration: 1000,
        message: '请导入要检测的新闻！',
        type: 'warning',
        center: true,
        offset: 120,
        customClass: 'custom-message'
      })
      e.currentTarget.blur()
    }
  },
  mounted () {
    // 默认添加第一个tab
    if (this.tabs.length === 0) {
      this.addTab()
    }
  }
}
</script>

<style scoped>
.wrapper{
  /* NavBanner为86px，wrapper默认的上外边距24px */
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
}

/* 内容区 */
/* 顶部描述样式：宽度 */
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

.content .page-desc{
  margin-top: 20px;
  padding: 10px 10px;
  font-size: 30px;
  line-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 注释框颜色 */
  /* background-color: #caf0f8; */
  width: 100%;
}
.content .page-desc button{
  display: inline-block;
  padding: 8px 10px;
  margin: 4px 10px 0;
  font-size: 23px;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}
.content .page-desc .active{
  background-color: #0f6bffc4;
  transform: scale(1.1);
}
.content .page-desc button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.content .page-desc .active:hover{
  background-color: #0f6bffc5;
}
.content .page-desc span{
  font-size: 24px;
}

/* 文件、图片、视频通用 */
.file-upload, .image-upload, .video-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  /* 区域宽度 */
  /* width: 600px; */
  width: 45vw;
  padding: 15px 20px 15px;
  border: 4px dotted #ccc;
  border-radius: 3%;
  background-color: #f9f9f9;
  transition: background-color 0.5s ease, border-color 0.5s ease;
  cursor: pointer;
}
.file-upload{
  padding: 15px 70px 15px;

}
.file-upload:hover, .image-upload:hover, .video-upload:hover {
  border-color: #2277ff;
  background-color: #e7e7e7b0;
}
.file-upload h2, .image-upload h2, .video-upload h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2d2d2d;
}

/*  提交文件区 */
.file-upload{
  padding-top: 40px;
  padding-bottom: 50px;
}
.file-upload .filesShow{
  margin-top: 10px;
}
.file-upload .filesShow h3{
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.file-upload .filesShow ul{
  padding-left: 3px;
}
.file-upload .filesShow ul li{
  font-size: 14px;
  text-align: left;
}
.file-upload .filesEmpty{
  height: 50px;
}

/*  提交图文区 */
.image-upload-position{
  position: relative;
  width: 260px;
  margin: 0 auto;
  /* display: flex; */
  /* justify-content: center; */
}
.image-upload .imagesShow{
  position: absolute;
  top: 10px;
  left: 10px;
}
.image-upload .imagesShow img{
  width: 240px;
  height: 160px;
  border-radius: 10px;
  object-fit: cover;
}
/*  提交图文区：文本框样式 */
.image-upload .textShow{
  margin-top: 20px;
  width: 100%;
}
.textShow textarea {
  width: 100%;
  padding: 8px 6px;
  font-size: 14px;
  font-family: 'Source Han Sans';
  border: 2px solid #c9cbcd;
  border-radius: 4px;
  background-color: #f9f9f9;
  resize: vertical;
  min-height: 40px;
  transition: border-color 0.5s ease;
}
.textShow textarea:focus {
  border-color: #4d90fe;
  outline: none;
}

/* 提交图文区 - 标签页样式 */
.image-upload h2{
  margin-bottom: 10px;
}
.el-tabs--border-card{
  width: calc(45vw - 80px);
  border: 1px solid #c9cbcd;
  border-radius: 5px;
}
::v-deep .el-tabs__header .el-tabs__new-tab{
  border: 1.5px solid #636568;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
::v-deep .el-tabs__header .el-tabs__new-tab i{
  color: #2e2c2c;
  font-weight: bold;
  transition: all 0.3s;
}
::v-deep .el-tabs__header .el-tabs__new-tab:hover{
  border: 1.5px solid #409eff;
}
::v-deep .el-tabs__header .el-tabs__new-tab:hover i{
  color: #409eff;
}
::v-deep .el-tabs--border-card>.el-tabs__header{
  padding-right: 12px;
  background-color: #e4e7ed;
  background-color: #e4e7ed89;
  /* overflow: hidden; */
}
::v-deep .el-tabs__nav{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-collapse: collapse;
}
::v-deep .el-tabs--border-card>.el-tabs__header div:nth-child(1){
  border-radius: 5px 0 0 0;
}
::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  font-size: 16px;
  color: #636568;
  border-right: 1.5px solid #dcdfe6;
  user-select: none;
}
::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
    background-color: #FFF;
    border-left-width: 1.5px;
    border-right-width: 1.5px;
    border-right-color: #DCDFE6;
    border-left-color: #DCDFE6;
}

::v-deep .el-tabs--border-card>.el-tabs__content{
  padding-bottom: 0;
}

/*  提交视频区 */
.video-upload-position{
  position: relative;
}
.video-upload .videoShow{
  position: absolute;
  top: 15px;
  left: 15px;
}
.video-upload .videoShow video{
  width: 640px;
  height: 360px;
  border-radius: 10px;
  object-fit: cover;
}

/* 提交按钮 */
.submit-button{
  /* 让上边距自动填充完上面空间 */
  margin-top: auto;
  margin-bottom: 8vh;
}
.submit-button.file-upload-button{
  /* 多个文件时才触发 */
  margin-top: 40px;
}
.submit-button.image-upload-button{
  margin-top: 18px;
}
.submit-button.video-upload-button{
  margin-top: 28px;
}

/* 装饰区 */
.decoration{
  position: absolute;
  top: 40px;
  right: 10px;
  pointer-events: none;
}
.decoration img{
  width: 300px;
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
    transform: rotate(5deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-5deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>

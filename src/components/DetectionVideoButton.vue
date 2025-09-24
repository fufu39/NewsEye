<!-- detection页面的 提交图片 按钮 -->
<template>
  <div class="card">
    <!-- 隐藏视频输入框 -->
    <input type="file" ref="videoInput" @change="handleVideoUpload" accept="video/*" hidden />
    <!-- 提交按钮 -->
    <div class="card-image-container" @click="triggerVideoInput">
      <svg
      t="1744209892143" class="image-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29836" width="70" height="70">
        <path d="M239.709091 265.309091v418.909091H791.272727v-418.909091H239.709091z m214.109091 300.218182v-183.854546l158.254545 90.763637-158.254545 93.090909zM714.472727 719.127273H314.181818c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272727h400.290909c13.963636 0 23.272727-9.309091 23.272728-23.272727 0-11.636364-9.309091-23.272727-23.272728-23.272727z" p-id="29837" fill="#313131">
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetectionVideoButton',
  methods: {
    triggerVideoInput () {
      this.$refs.videoInput.click()
    },
    // 上传文件给父组件
    handleVideoUpload (e) {
      const videos = e.target.files
      this.$emit('video-selected', videos[0]) // 每次只是传递一个视频
    }
  }
}
</script>

<style scoped>
/* 外部框 */
.card {
  display: flex;
  flex-direction: column;
  width: 670px;
  height: 390px;
  /* max-height: 240px; */
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1),
    4px 4px 12px rgba(0, 0, 0, 0.3);
}
.card.no-hover:hover {
  transform: none;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

/* 内部框 */
.card-image-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(165, 165, 165, 0.579);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
}
.card-image-container:hover{
  background-color: rgba(165, 165, 165, 0.479);
}

.image-icon {
  font-size: 80px;
  color: rgba(0, 0, 0, 0.75);
}
</style>

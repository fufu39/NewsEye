<!-- detection页面的 提交图片 按钮 -->
<template>
  <div class="card">
    <!-- 隐藏图片输入框 -->
    <input type="file" ref="imageInput" @change="handleImageUpload" accept="image/*" hidden />
    <!-- 图片展示框 -->
    <div class="card-image-container" @click="triggerImageInput">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        stroke-width="0"
        fill="currentColor"
        stroke="currentColor"
        class="image-icon"
      >
        <path
          d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1a8.11 8.11 0 0 1-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l229.6 271.6c2.6 3.3 2.2 8.4-1.2 11.2z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetectionImageButton',
  methods: {
    triggerImageInput () {
      this.$refs.imageInput.click()
    },
    // 上传文件给父组件
    handleImageUpload (e) {
      const images = e.target.files
      this.$emit('image-selected', images[0]) // 传递一张图片文件
    }
  }

}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 180px;
  max-height: 240px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;
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
  font-size: 40px;
  color: rgba(0, 0, 0, 0.75);
}
</style>

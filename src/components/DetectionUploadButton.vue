<!-- detection页面的 提交文件 按钮 -->
<template>
  <div>
    <!-- 隐藏文件输入框（只接收docx文件） -->
    <input type="file" ref="fileInput" @change="handleFileUpload" accept=".docx" multiple hidden />
    <!-- 提交按钮 -->
    <button class="upload-button" @click="triggerFileInput">
      <span class="folderContainer">
        <svg
          class="fileBack"
          width="146"
          height="113"
          viewBox="0 0 146 113"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
            fill="url(#paint0_linear_117_4)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_117_4"
              x1="0"
              y1="0"
              x2="72.93"
              y2="95.4804"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8F88C2"></stop>
              <stop offset="1" stop-color="#5C52A2"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg
          class="filePage"
          width="88"
          height="99"
          viewBox="0 0 88 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>
          <defs>
            <linearGradient
              id="paint0_linear_117_6"
              x1="0"
              y1="0"
              x2="81"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white"></stop>
              <stop offset="1" stop-color="#686868"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg
          class="fileFront"
          width="160"
          height="79"
          viewBox="0 0 160 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
            fill="url(#paint0_linear_117_5)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_117_5"
              x1="38.7619"
              y1="8.71323"
              x2="66.9106"
              y2="82.8317"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#C3BBFF"></stop>
              <stop offset="1" stop-color="#51469A"></stop>
            </linearGradient>
          </defs>
        </svg>
      </span>
      <p class="text">上传文件</p>
    </button>
  </div>
</template>

<script>
import mammoth from 'mammoth' // 用于解析docx
export default {
  name: 'DetectionUploadButton',
  data () {
    return {
      // 通过数组保存转化结果
      txt: [],
      img: [],
      fileInfo: []
    }
  },
  methods: {
    // 触发input[type="file"]点击事件
    triggerFileInput () {
      this.$refs.fileInput.click()
    },
    // input上传文件给父组件
    async handleFileUpload (e) {
      const files = e.target.files
      if (!files || files.length === 0) return // 处理为空情况
      this.txt = []
      this.img = []
      this.fileInfo = []

      // 增加文件转化为文本和图片的处理逻辑
      for (const file of files) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          try {
            // 保存文件名、文件大小
            this.fileInfo.push({
              fileName: file.name,
              fileSize: file.size
            })

            // 转化为二进制数据
            const arrayBuffer = await file.arrayBuffer()
            // 提取文本
            const textResult = await mammoth.extractRawText({ arrayBuffer })
            const textContent = textResult.value.trim().replace(/\n/g, ' ')
            this.txt.push(textContent)

            // 提取图片
            const imagesArray = [] // 单文件的图片数组
            await mammoth.convertToHtml(
              { arrayBuffer },
              {
                convertImage: mammoth.images.inline(function (element) {
                  return element.read('base64').then((imageBase64) => {
                    const byteCharacters = atob(imageBase64) // 将 Base64 转换回二进制
                    const byteNumbers = new Array(byteCharacters.length)
                    for (let i = 0; i < byteCharacters.length; i++) {
                      byteNumbers[i] = byteCharacters.charCodeAt(i)
                    }
                    const byteArray = new Uint8Array(byteNumbers)
                    const blob = new Blob([byteArray], { type: element.contentType })
                    const file = new File([blob], `image_${Date.now()}.${element.contentType.split('/')[1]}`, { type: element.contentType })

                    imagesArray.push(file) // 存储图片
                    return '' // 不渲染图片
                  })
                })
              }
            )
            // 只取第一张图片，如果没图片就存入undefined
            this.img.push(imagesArray[0])
          } catch (error) {
            console.log('文件处理错误', error)
          }
        }
      }
      // 自定义方法xxx-update，提供文件给父组件
      this.$emit('fileInfo-update', this.fileInfo)
      this.$emit('txt-update', this.txt)
      this.$emit('img-update', this.img)
    }
  }
}
</script>

<style scoped>
/* 按钮整体布局 */
.upload-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  height: 60px;
  border: none;
  padding: 0px 20px;
  border-radius: 8px;
  /* 背景色 */
  background-color: rgb(47, 47, 83);
  /* background-color: #89bbfe; */
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
/* 文件动画样式 */
.folderContainer {
  width: 45px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.fileBack {
  z-index: 1;
  width: 80%;
  height: auto;
}
.filePage {
  width: 50%;
  height: auto;
  position: absolute;
  z-index: 2;
  transition: all 0.3s ease-out;
}
.fileFront {
  width: 85%;
  height: auto;
  position: absolute;
  z-index: 3;
  opacity: 0.95;
  transform-origin: bottom;
  transition: all 0.3s ease-out;
}

.upload-button:hover .filePage {
  transform: translateY(-5px);
}
.upload-button:hover {
  /* 悬停时背景色 */
  background-color: rgba(58, 58, 94, 0.96);
  /* background-color: #fff; */
}
.upload-button:active {
  transform: scale(0.95);
}
.upload-button:hover .fileFront {
  transform: rotateX(30deg);
}

/* 文本样式 */
.text {
  color: white;
  font-size: 23px;
  /* font-weight: 600; */
  letter-spacing: 2.1px;
}
</style>

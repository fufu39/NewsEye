// 新闻检测的接口请求
import request from '@/utils/request_detect'

// 提交检测，获取检测结果
export const getDetectionResult = (images, texts, email) => {
  // 首先对得到的images和texts进行数据类型处理
  const formData = new FormData()

  // 遍历图片数组并添加到 formData
  images.forEach((image, index) => {
    if (image === null) {
      // 传入空文件
      const emptyFile = new File([], 'empty.dasdas', { type: 'application/x-dasdas' })
      formData.append('images', emptyFile)
      // 传入空字符串
      // formData.append('images', '')
    } else {
      formData.append('images', image) // 对应后端 `List<MultipartFile> images`
    }
  })
  // 遍历文本数组并添加到 formData
  texts.forEach((text) => {
    formData.append('texts', text) // 对应后端 `List<String> texts`
  })
  // 添加邮箱
  formData.append('email', email)

  // 打印formData键值对
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value)
  // }

  return request.post('/api/detect', formData)
}

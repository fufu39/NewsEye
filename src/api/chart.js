// 图表渲染的接口请求
import request from '@/utils/request'

// 获取历史记录（实际用到的是里面的置信度）
export const getHistoryDetail = (email) => {
  return request.get('/api/history/search', {
    params: {
      email
    }
  })
}

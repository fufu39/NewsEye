// 新闻检测的接口请求
import request from '@/utils/request'

// 获取历史记录
export const getHistoryDetail = (email) => {
  return request.get('/api/history/search', {
    params: {
      email
    }
  })
}

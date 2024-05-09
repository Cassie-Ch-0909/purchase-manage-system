/* 
    首页接口
*/
import request from '@/utils/request'

//定义接口
export const host ='http://localhost:6688';//代理请求

export function getHomeTotalAPI() {
    return request({
      url: '/api/home/dataCount',
      method: 'GET',
    })
  }
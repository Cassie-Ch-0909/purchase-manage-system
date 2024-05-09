/* 
    首页接口
*/
import request from "@/utils/request";

// 定义接口
export const host = "http://localhost:6688"; //代理请求

/* 
    头部数据统计
*/
export function getHomeTotalAPI() {
  return request({
    url: "/api/home/dataCount",
    method: "GET"
  });
}

/* 
    折线图数据
*/
export function getHomeLineAPI() {
  return request({
    url: "/api/home/farmat",
    method: "GET"
  });
}

/* 
    今日订单数据
*/
export function getHomeOrderAPI() {
  return request({
    url: "/api/home/orderinfo",
    method: "GET"
  });
}
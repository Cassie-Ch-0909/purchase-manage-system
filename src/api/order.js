import request from "@/utils/request";

//定义接口
export const host = "http://localhost:6688"; //代理请求

/* 
    获取订单列表 /api/order/list
*/
export function getOrderListAPI(params) {
  return request({
    url: "/api/order/list",
    method: "GET",
    params
  });
}

/* 
    订单汇总 /api/order/changeStatus
*/
export function changeStatusAPI(params) {
  return request({
    url: "/api/order/changeStatus",
    method: "GET",
    params
  });
}

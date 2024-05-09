/* 
    商品列表页面
*/
import request from "@/utils/request";

// 代理请求
export const host = "http://localhost:6688";

/* 
    商品列表 page页码
*/
export function getProjectListAPI(params) {
  return request({
    url: "/api/goods/projectList",
    method: "GET",
    params
  });
}

/* 
    查询商品
*/
export function searchGoodsAPI(params) {
  return request({
    url: "/api/goods/search",
    method: "GET",
    params
  });
}

/* 
    根据id删除商品
*/
export function deleteGoodsByIdAPI(params) {
  return request({
    url: "/api/goods/deleteItemById",
    method: "GET",
    params
  });
}

/* 
    产品类目 type
*/
export function selectItemCategoryByParentId(params) {
  return request({
    url: "/api/goods/itemCategory/selectItemCategoryByParentId",
    method: "GET",
    params
  });
}

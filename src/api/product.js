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
export function selectItemCategoryByParentIdAPI(params) {
  return request({
    url: "/api/goods/itemCategory/selectItemCategoryByParentId",
    method: "GET",
    params
  });
}

/* 
    添加商品
*/
export function addGoodsAPI(params) {
  return request({
    url: "/api/goods/item/insertTbItem",
    method: "GET",
    params
  });
}

/* 
    编辑商品
*/
export function updateTbItemAPI(params) {
  return request({
    url: "/api/goods/item/updateTbItem",
    method: "GET",
    params
  });
}

/* 
    获取商品分类
*/
export function itemCategoryAPI() {
  return request({
    url: "/api/itemCategory",
    method: "GET"
  });
}

/* 
    新增子级类目
*/
export function insertItemCategoryAPI(params) {
  return request({
    url: "/api/itemCategory/insertItemCategory",
    method: "GET",
    params
  });
}

/* 
    修改类目
*/
export function updateItemCategoryAPI(params) {
  return request({
    url: "/api/itemCategory/updateCategory",
    method: "GET",
    params
  });
}

/* 
    新增一级类目
*/
export function insertCategoryAPI(params){
  return request({
    url: "/api/itemCategory/insertCategory",
    method: "GET",
    params
  });
}

/* 
    删除类目
*/
export function deleteCategoryByIdAPI(params){
  return request({
    url: "/api/content/deleteContentCategoryById",
    method: "GET",
    params
  });
}
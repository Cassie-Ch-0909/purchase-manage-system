<script setup>
import {
  Document,
  Menu as IconMenu,
  Goods,
  VideoCamera
} from "@element-plus/icons-vue";
import {defineProps } from "vue";
const prop = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#112f50"
    class="el-menu-vertical-demo"
    :collapse="prop.isCollapse"
    :default-active="$route.meta.activeMenu || $route.path"
    router
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- 采购后台管理系统 -->
    <el-menu-item>
      <span>采购后台管理系统</span>
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 产品管理 -->
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>产品管理</span>
      </template>
      <!-- 产品管理子菜单 -->
      <el-menu-item index="/product/productList">产品列表</el-menu-item>
      <el-menu-item index="/product/category">产品分类</el-menu-item>
    </el-sub-menu>
    <!-- 订单管理 -->
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>订单管理</span>
      </template>
      <!-- 订单管理子菜单 -->
      <el-menu-item index="/order/orderList">订单列表</el-menu-item>
      <el-menu-item index="/order/collect">汇总清单</el-menu-item>
      <el-menu-item index="3-3">订单审核</el-menu-item>
    </el-sub-menu>
    <!-- 广告管理 -->
    <el-sub-menu index="4">
      <template #title>
        <el-icon><VideoCamera /></el-icon>
        <span>广告管理</span>
      </template>
      <!-- 广告管理子菜单 -->
      <el-menu-item index="4-1">广告列表</el-menu-item>
      <el-menu-item index="4-2">广告分类</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<style scoped>
.el-menu{
  border-right: none;
}

.el-menu-item.is-active {
    color: #fff;
    background: #1e78bf;
}

/* 
    当菜单不处于折叠状态（即没有 el-menu--collapse 类时）：
    将菜单的宽度设置为 200 像素。
    将菜单的最小高度设置为 400 像素。
*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
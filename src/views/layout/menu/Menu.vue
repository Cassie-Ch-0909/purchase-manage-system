<script setup>
import {
  Document,
  Menu as IconMenu,
  Goods,
  VideoCamera
} from "@element-plus/icons-vue";
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
    :default-active="$route.meta.activeMenu || $route.path"
    router
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- 采购后台管理系统 -->
    <el-menu-item>
      采购后台管理系统
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 产品管理 -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>产品管理</span>
      </template>
      <!-- 产品管理子菜单 -->
      <el-menu-item index="2-1">产品列表</el-menu-item>
      <el-menu-item index="2-2">产品分类</el-menu-item>
    </el-sub-menu>
    <!-- 订单管理 -->
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>订单管理</span>
      </template>
      <!-- 订单管理子菜单 -->
      <el-menu-item index="3-1">订单列表</el-menu-item>
      <el-menu-item index="3-2">汇总清单</el-menu-item>
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
</style>
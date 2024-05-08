<script setup></script>
<template>
  <!-- 顶部菜单区域 -->
  <div class="header">
    <el-row>
      <!-- 加起来是24 -->
      <el-col :span="4">
        <span class="iconfont icon-right-indent"></span>
        <span class="iconfont icon-left-indent"></span>
      </el-col>
      <el-col :span="20">
        <div class="right">
          22
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- 路由的出口 -->
  <router-view></router-view>
</template>
<style lang="scss" scoped>
.header {
  background: pink;
  height: 50px;
  line-height:50px;
  .right {
    text-align: right;
    padding-right: 20px;
  }
}
</style>

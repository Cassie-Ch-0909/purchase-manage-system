<script setup>
import TreeProduct from "./TreeProduct.vue";
</script>
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="nav">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <TreeProduct></TreeProduct>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="wrapper">
          <div class="my-title">商品添加</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.nav {
  height: 600px;
  background: #fff;
  .title {
    background: skyblue;
    padding: 20px;
    color: #fff;
  }
  .tree{
    padding: 10px;
  }
}
.wrapper {
  height: 800px;
  background: #fff;
  .my-title {
    background: #eee;
    padding: 14px;
    color: #333;
    font-weight: bold;
  }
}
</style>

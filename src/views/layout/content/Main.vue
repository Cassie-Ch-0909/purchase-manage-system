<script setup>
import { defineProps, defineEmits } from "vue";
const prop = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["changeCollapse"]);
/* 
    点击折叠效果 子传父改变父组件中isCollapse的值
*/
function changeOpen() {
  emit('changeCollapse')
}
</script>
<template>
  <!-- 顶部菜单区域 -->
  <div class="header">
    <el-row>
      <!-- 加起来是24 -->
      <el-col :span="4">
        <span
          v-if="!prop.isCollapse"
          class="iconfont icon-right-indent"
          @click="changeOpen"
        ></span>
        <span
          v-else
          class="iconfont icon-left-indent"
          @click="changeOpen"
        ></span>
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
  line-height: 50px;
  .iconfont {
    font-size: 22px;
    color: #fff;
    cursor: pointer;
  }
  .right {
    text-align: right;
    padding-right: 20px;
  }
}
</style>

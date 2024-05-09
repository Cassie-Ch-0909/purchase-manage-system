<script setup>
import { ref, defineProps, toRefs } from "vue";
/* 
    pageSize和total由父组件引入
    pageSize: 第几页
    total: 一页几条
*/
const props = defineProps({
  pageSize: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 10
  }
});
/* 
    toRefs 是一个 Vue 3 中的 Composition API 函数，
    它接受一个响应式对象作为参数，并将其转换为一个包含多个属性的普通对象，
    但这些属性会保持响应性，即在原属性发生变化时，生成的属性也会相应更新。
*/
const { total, pageSize } = toRefs(props);
const currentPage = ref(1);
// const pageSize = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
/* 
    点击页码切换页面
    将点击的页码数传递给父组件
*/
const emit = defineEmits(['getCurrentPage'])
const handleCurrentChange = val => {
  // console.log(`current page: ${val}`);
  emit('getCurrentPage',val)
};
</script>
<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, prev, pager, next, jumper"
    :total="total"
    @current-change="handleCurrentChange"
  />
</template>

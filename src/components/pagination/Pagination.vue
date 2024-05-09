<script setup>
import { ref } from "vue";
const currentPage = ref(1);
const pageSize = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>
<template>
  <el-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :page-sizes="[100, 200, 300, 400]"
  :small="small"
  :disabled="disabled"
  :background="background"
  layout="total, sizes, prev, pager, next, jumper"
  :total="400"
  @current-change="handleCurrentChange"
/>

</template>
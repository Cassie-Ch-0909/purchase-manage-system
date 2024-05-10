<script setup>
import { selectItemCategoryByParentIdAPI } from "@/api/product";
const props = {
  label: "name",
  children: "zones",
  isLeaf: "leaf"
};

const loadNode = (node, resolve) => {
  /* 
    如果 node 的 level 属性为 0，表示这是顶层节点，函数会立即调用 resolve 回调函数，
    并传入一个包含单个对象 { name: "region" } 的数组作为参数。

    如果 node 的 level 属性大于 1，表示这是深层节点，函数会立即调用 resolve 回调函数，
    并传入一个空数组作为参数，表示没有子节点。
  */
  if (node.level === 0) {
    selectItemCategoryByParentIdAPI().then(res => {
      if (res.data.status == 200) {
        console.log(res);
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
  if (node.level >= 1) {
    selectItemCategoryByParentIdAPI({ type: node.data.cid }).then(res => {
      if (res.data.status == 200) {
        console.log(res);
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
};
</script>
<template>
  <el-tree style="max-width: 600px" :props="props" :load="loadNode" lazy />
</template>
<style scoped lang="scss"></style>

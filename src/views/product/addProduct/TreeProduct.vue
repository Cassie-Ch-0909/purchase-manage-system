<script setup>
import { selectItemCategoryByParentIdAPI } from "@/api/product";
import { defineEmits, reactive } from "vue";
import { ElTree } from "element-plus";

const props = reactive({
  label: "name",
  children: "zones",
  isLeaf: "leaf"
});

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
        // console.log(res);
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
  if (node.level >= 1) {
    selectItemCategoryByParentIdAPI({ type: node.data.cid }).then(res => {
      if (res.data.status == 200) {
        // console.log(res);
        return resolve(res.data.result);
      } else {
        return resolve([]);
      }
    });
  }
};

const emit = defineEmits(["getTreeData"]);
//点击tree-发送点击的数据----------------
const currentChange = data => {
  emit("getTreeData", data);
};
</script>
<template>
  <el-tree
    :props="props"
    :load="loadNode"
    lazy
    @node-expand="currentChange"
  />
</template>
<style scoped lang="scss"></style>

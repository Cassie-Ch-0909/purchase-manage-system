<script setup>
import { ref, defineProps,defineEmits } from "vue";
import { insertItemCategoryAPI } from "@/api/product.js";
import { ElMessage } from "element-plus";

// 接收父组件传递过来的数据
const props = defineProps(["info"]);

// 是否显示弹框
const dialogVisible = ref(false);

// v-model输入框
const input = ref("");

// 子传父事件
const emit = defineEmits(["updateViews"]);

/* 
    调用接口新增分类
*/
async function insertItemCategory(params) {
  const res = await insertItemCategoryAPI(params);
  console.log(res);
  if (res.data.status == 200) {
    ElMessage({
      showClose: true,
      message: "恭喜你，新增成功",
      type: "success"
    });
    //隐藏弹框
    dialogVisible.value = false;
    emit("updateViews");
  }
}

// 关闭弹框
const handleClose = () => {
  dialogVisible.value = false;
};

//显示弹框
const isShow = () => {
  dialogVisible.value = true;
  console.log("dialogVisible.value----", dialogVisible.value);
};

//弹框---确定---
const submitHandle = () => {
  // 调接口添加一级分类
  insertItemCategory({
    cid: props.info.cid,
    name: input.value
  });
};

defineExpose({
  dialogVisible,
  isShow,
  input
});
</script>
<template>
  <el-dialog
    :title="info.title"
    v-model="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <strong>请输入类目名称：</strong>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>

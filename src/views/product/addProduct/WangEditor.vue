<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { defineEmits } from "vue";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
//   }, 1500);
// });

// 菜单栏配置项，不写配置默认是所有配置都加上
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// wangeditor创建的生命周期
const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

/* 
    把wangEditor用户输入的商品描述——发送——商品添加存储
*/
const emit = defineEmits(["sendEangEditor"]);
const onChange = () => {
  //   console.log("onchange", valueHtml.value);
  emit("sendEangEditor", valueHtml.value);
};

const mode = "simple";

// 清空方法
const clearHtml = () => {
  valueHtml.value = "";
};

//设置内容
const setWangHtml = val => {
  valueHtml.value = val;
};

/* 
    用于在组件中显式地暴露一些内容给父组件
    假设你有一个组件内部定义了一些变量和方法，你希望父组件能够访问到它们，你可以在组件的<script setup>部分使用defineExpose来实现
*/
// 暴露出去
defineExpose({
  valueHtml,
  clearHtml,
  setWangHtml
});
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="onChange"
    />
  </div>
</template>
<style scoped></style>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
// import { UploadProps, UploadUserFile } from 'element-plus'
import {host} from "@/api/product"
const fileList = ref([])


const handleRemove = () => {
}

const emit = defineEmits(['sendImgUrl'])

const success = (response) => {
    let url = host +'/' +response.url.slice(7)
    console.log(url)
    emit('sendImgUrl',url)
}

</script>
<template>
    <!-- action 直接写 /api/upload -->
  <el-upload
    v-model:file-list="fileList"
    action="/api//upload"
    list-type="picture-card"
    :on-success="success"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>
<style scoped></style>

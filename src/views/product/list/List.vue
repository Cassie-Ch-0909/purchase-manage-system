<script setup>
import { ref, onMounted } from "vue";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { ElTable } from "element-plus";
import { getProjectListAPI } from "../../../api/product.js";
import dayjs from "dayjs";
import { removeHTMLTag } from "../../../utils/common";
import pagination from '@/components/pagination/Pagination.vue'
// 搜索框数组对象
const formInline = ref({
  name: "",
  date: ""
});

// 表格内容对象
const tableData = ref([]);

// 查询按钮
const onSubmit = () => {
  console.log(formInline.value);
};

// 编辑按钮
const handleEdit = (index, row) => {
  console.log(index, row);
};

// 删除按钮
const handleDelete = (index, row) => {
  console.log(index, row);
};

/* 
    定义分页数据
*/
const pageSize = ref(1);
const total = ref(10)

/* 
    调接口获取商品列表
*/
async function getProjectList(param) {
  const res = await getProjectListAPI({
    page:param
  });
  console.log(res);
  tableData.value = res.data.data;
  total.value = res.data.total
  pageSize.value = res.data.pageSize
}

/* 
    接收子传父传过来的pageSIze，并发请求获取数据
*/
function getCurrentPage(newPageSize){
  // console.log(newPageSize)
  getProjectList(newPageSize)
}

onMounted(() => {
  getProjectList();
});
</script>
<template>
  <div>
    <!-- 1. 产品搜索 -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- 产品名称 -->
          <el-form-item label="产品名称">
            <el-input
              v-model="formInline.name"
              placeholder="输入品牌名称"
              clearable
              size="small"
            />
          </el-form-item>
          <!-- 添加时间 -->
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="请选择时间"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button type="warning" :icon="Plus">
          添加商品
        </el-button>
        <el-button type="danger" :icon="Delete">批量删除</el-button>
      </div>
    </div>
    <!-- 
        2. 产品列表 
        tableData里面的每个key必须和el-table-item的每个prop相对应
    -->
    <div class="content">
      <el-table
        size="large"
        :data="tableData"
        style="width: 100%;"
        border
        header-cell-class-name="active-header"
        cell-class-name="table-center"
      >
        <!-- 是否全选 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 商品编号 -->
        <el-table-column prop="id" label="商品编号" width="120">
        </el-table-column>
        <!-- 
            商品名称 
            当内容溢出列时显示提示工具提示
        -->
        <el-table-column
          prop="title"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span
              style="color:blue;cursor: pointer;"
              @click="handleDetail(scope.$index, scope.row)"
              >{{ scope.row.title }}</span
            >
          </template>
        </el-table-column>
        <!-- 商品价格 -->
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <!-- 商品类目 -->
        <el-table-column prop="category" label="商品类目" width="140">
        </el-table-column>
        <!-- 添加时间 -->
        <el-table-column label="添加时间" prop="create_time">
          <template #default="scope">
            <span>{{
              dayjs(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <!-- 商品卖点 -->
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- 商品描述 -->
        <el-table-column label="商品描述" show-overflow-tooltip prop="descs">
          <!-- 默认插槽 -->
          <template #default="scope">
            <span>{{ removeHTMLTag(scope.row.descs) }}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <pagination :pageSize="pageSize" :total="total" @getCurrentPage="getCurrentPage"></pagination>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page{
  padding: 10px;
}
.header {
  background-color: #fff;
  margin-bottom: 20px;
  .group {
    border: 1px solid #eee;
    padding: 10px;
  }
}
.content {
  background-color: #fff;
  ::v-deep .active-header {
    color: #333;
    text-align: center;
  }

  ::v-deep .table-center {
    text-align: center;
  }

  .pagination {
    padding: 10px;
  }
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

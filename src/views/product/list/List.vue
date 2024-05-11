<script setup>
import { ref, onMounted } from "vue";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { ElTable, ElMessage, ElMessageBox } from "element-plus";
import {
  getProjectListAPI,
  searchGoodsAPI,
  deleteGoodsByIdAPI
} from "../../../api/product.js";
import dayjs from "dayjs";
import { removeHTMLTag } from "../../../utils/common";
import pagination from "@/components/pagination/Pagination.vue";
import router from "@/router";
import useGoodsStore from "@/stores/GoodsInfo.js";
// 获取仓库的方法
const store = useGoodsStore();
console.log("store", store);

// 搜索框数组对象
const formInline = ref({
  name: "",
  date: ""
});

// 表格内容对象
const tableData = ref([]);

/* 
    调取查询接口
*/
async function searchGoods(params) {
  const res = await searchGoodsAPI(params);
  console.log(res);
  if (res.data.status === 200) {
    tableData.value = res.data.result;
    // res.data.result.length / pageSize.value 计算出总页数，但由于页数必须是整数，
    // 因此使用 Math.ceil() 方法向上取整，确保总页数是整数
    total.value = res.data.result.length;
  } else {
    tableData.value = [];
    total.value = 0;
    pageSize.value = 0;
  }
}

// 查询按钮
const onSubmit = () => {
  console.log(formInline.value);
  searchGoods({ search: formInline.value.name });
};

// 返回按钮
const toBack = () => {
  // 清空搜索表单
  formInline.value = {
    user: "",
    date: ""
  };
  // 获取第一页数据
  getProjectList();
};

// 编辑按钮
const handleEdit = (index, row) => {
  console.log(index, row);
  // 跳转到添加商品界面 商品添加 编辑 查看详情在同一个页面
  router.push("/product/addProduct");
  // pinia存储数据 当前行的数据 --
  store.setRowData({
    title: "编辑",
    rowData: row
  });
};

/* 
    调用删除单个商品接口
*/
async function deleteGoodsById(params) {
  const res = await deleteGoodsByIdAPI({ id: params });
  if (res.data.status == 200) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    //删除成功--更新当前的视图
    //判断当前的数据是否是当前的页面的最后一条数据---
    if (total.value % pageSize.value === 1) {
      currentPage.value = currentPage.value - 1 > 0 ? currentPage.value - 1 : 1;
    }
    getProjectList(currentPage.value);
  }
}

// 删除按钮
const handleDelete = (index, row) => {
  console.log(index, row);
  ElMessageBox.confirm(
    "你确定删除当前行的数据，确认删除是不可逆的操作？",
    "Warning",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      // 调用删除单个商品接口删除商品
      deleteGoodsById(row.id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除"
      });
    });
};

/* 
    定义分页数据
*/
const pageSize = ref(1);
const total = ref(10);

/* 
    调接口获取商品列表
*/
async function getProjectList(param) {
  const res = await getProjectListAPI({
    page: param
  });
  // console.log(res);
  if (res.data.status === 200) {
    tableData.value = res.data.data;
    total.value = res.data.total;
    pageSize.value = res.data.pageSize;
  }
}

// 存储当前页码
const currentPage = ref();

/* 
    接收子传父传过来的pageSIze，并发请求获取数据
*/
function getCurrentPage(newPageSize) {
  // console.log(newPageSize)
  // 存储当前的页码 删除的时候 需要获取当前的页码数据
  currentPage.value = newPageSize;
  getProjectList(newPageSize);
}

// 点击跳转到添加商品页面
function toAddProduct() {
  // console.log('添加商品')
  router.push("/product/addProduct");
    // pinia存储数据 当前行的数据 --
    store.setRowData({
    title: "添加",
    rowData: {}
  });
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
            <el-button type="primary" @click="toBack" size="small">
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button type="warning" :icon="Plus" @click="toAddProduct">
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
        <pagination
          :pageSize="pageSize"
          :total="total"
          @getCurrentPage="getCurrentPage"
        ></pagination>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page {
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

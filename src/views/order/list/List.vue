<script setup>
import Pagination from "@/components/pagination/Pagination.vue";
import { ref } from "vue";
import "element-plus/theme-chalk/el-message-box.css";
import { getOrderListAPI, changeStatusAPI } from "@/api/order";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

const formInline = ref({});
const tableData = ref([]); //订单列表数据展示
const total = ref(10);
const pageSize = ref(1);
const currentPage = ref();
/*
    获取订单列表
*/
async function getOrderList(param) {
  const res = await getOrderListAPI({ page: param });
  // console.log(param,res)
  if (res.data.status == 200) {
    let arr = res.data.data;
    arr.forEach(ele => {
      ele.huizongStatus = ele.huizongStatus == 1 ? "未汇总" : "已汇总";
      ele.yudingTime = dayjs(ele.yudingTime).format("YYYY-MM-DD");
    });
    tableData.value = arr;
    total.value = res.data.total;
    pageSize.value = res.data.pageSize;
  } else {
    tableData.value = [];
    total.value = 1;
    pageSize.value = 1;
  }
}
getOrderList(2);

//获取分页页码------------------------------
const CurrentChange = page => {
  // console.log('ss',page)
  getOrderList(page);
  currentPage.value = page;
};

/*
    复选框选中的订单数组
*/
const ids = ref();
function select(selection, row) {
  console.log(selection, row);
  let arr = [];
  selection.forEach(ele => {
    arr.push(ele.id);
  });
  ids.value = arr;
  // 存储当前的勾选行的数据信息
}

/*
    调接口订单汇总
*/
async function changeStatus(params) {
  if (ids.value.length >= 2) {
    //汇总订单
    const res = await changeStatusAPI(params);
    if (res.data.status === 200) {
      ElMessage({
        showClose: true,
        message: "汇总成功!",
        type: "success"
      });
      getOrderList(currentPage.value);
    }
  } else {
    ElMessageBox.alert("汇总订单至少需要2条订单信息", "汇总订单", {
      confirmButtonText: "确定",
      callback: () => {
        ElMessage({
          message: "取消汇总!",
          type: "info"
        });
      }
    });
  }
}

/*
    点击订单汇总按钮
*/
function orderCollect() {
  changeStatus({ ids: ids.value.join(",") });
}

/*
    导出Excel
*/
//导出名称
const name = ref("首客生鲜");
const download = () => {
  // 通过id，获取导出的表格数据
  const wb = XLSX.utils.table_to_book(document.getElementById("table"), {
    raw: true
  });
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], {
        // 定义文件格式流
        type: "application/octet-stream"
      }),
      name.value + ".xlsx"
    );
  } catch (e) {
    console.log(e);
  }
  return wbout;
};
</script>
<template>
  <div class="header">
    <Breadcrumb></Breadcrumb>
    <!-- 预定编号 预定时间 查询按钮 -->
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="预定编号">
          <el-input v-model="formInline.name" placeholder="预定编号"></el-input>
        </el-form-item>
        <el-form-item label="预定时间">
          <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 订单汇总和导出Excel按钮 -->
    <div class="group">
      <el-button type="warning" @click="orderCollect">订单汇总</el-button>
      <!-- <el-button type="warning">导出</el-button> -->
      <el-button class="order-btn" type="warning" @click="download"
        >导出</el-button
      >
      <!-- <download-excel
        class="export-excel-wrapper"
        :data="tableData"
        :fields="json_fields"
        :header="title"
></download-excel>        name="采购公司订单列表.xls"
      
        <el-button size="small" type="warning">导出</el-button>
      </download-excel> -->
    </div>
  </div>
  <!-- 表格区域 -->
  <div class="content">
    <el-table
      id="table"
      :data="tableData"
      border
      style="width: 100%"
      header-cell-class-name="active-header"
      cell-class-name="table-center"
      @select="select"
    >
      <!-- 复选框 -->
      <el-table-column type="selection" width="55" :selectable="selectable">
      </el-table-column>
      <!-- 订单编号 -->
      <el-table-column prop="code" label="订单编号">
        <template #default="scope">
          <span
            @click="toOrderDecs(scope.row)"
            style="color:blue;cursor: pointer;"
            >{{ scope.row.code }}</span
          >
        </template>
      </el-table-column>
      <!-- 下单人 -->
      <el-table-column prop="ordername" label="下单人"> </el-table-column>
      <!-- 所属单位 -->
      <el-table-column prop="company" label="所属单位"> </el-table-column>
      <!-- 联系电话 -->
      <el-table-column prop="phone" label="联系电话"> </el-table-column>
      <!-- 预定时间 -->
      <el-table-column prop="yudingTime" label="预定时间">
        <!-- <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}
          </template> -->
      </el-table-column>
      <!-- 订单总价格 -->
      <el-table-column prop="price" label="订单总价格"> </el-table-column>
      <!-- 汇总状态 -->
      <el-table-column prop="huizongStatus" label="汇总状态">
        <!-- <template slot-scope="scope">
            {{ scope.row.huizongStatus == 1 ? '未汇总' : '已汇总' }}
          </template> -->
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="padding:10px;">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @getCurrentPage="CurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<style scoped></style>

<script setup>
import { getHomeTotalAPI,getHomeOrderAPI } from "@/api/home";
import { onMounted, ref } from "vue";

/* 
    调接口获取首页数据统计
*/
const dataCountObj = ref({});
const getHomeTotal = async () => {
  const res = await getHomeTotalAPI();
  // console.log(res);
  dataCountObj.value = res.data.data.list;
};

/* 
    数据格式----23456 --> 23,456
*/
const numHandle = value => {
  if (!value) return;
  return value.toLocaleString();
};

/* 
    调接口获取首页订单数据
*/
const dataOrderObj = ref({});
const getHomeOrder = async () => {
  const res = await getHomeOrderAPI();
  console.log(res);
  dataOrderObj.value = res.data.list;
};

onMounted(() => {
  getHomeTotal();
  getHomeOrder()
});
</script>

<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ numHandle(dataCountObj.saleTotal) }}</div>
        <div class="bottom">今日销售额：{{ numHandle(dataCountObj.sale) }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ numHandle(dataCountObj.viewsTotal) }}</div>
        <div class="bottom">
          今日访问量：{{ numHandle(dataCountObj.views) }}
        </div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ numHandle(dataCountObj.collectTotal) }}</div>
        <div class="bottom">
          今日销售额：{{ numHandle(dataCountObj.collect) }}
        </div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ numHandle(dataCountObj.payTotal) }}</div>
        <div class="bottom">今日支付量：{{ numHandle(dataCountObj.pay) }}</div>
      </div>
    </div>
    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="draw" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>今日订单</span>
          </div>
        </template>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ dataOrderObj.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ dataOrderObj.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ dataOrderObj.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>本月订单</span>
          </div>
        </template>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ dataOrderObj.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ dataOrderObj.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ dataOrderObj.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>快捷入口</span>
          </div>
        </template>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .clearfix {
    margin-bottom: 20px;
  }

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }

  .item {
    text-align: center;
    font-size: 24px;
    color: #333;

    .el-col {
      border-right: 1px solid #eee;
    }

    .el-col:last-child {
      border-right: none;
    }

    .title {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>

<script setup>
import TreeProduct from "./TreeProduct.vue";
import UpLoadImg from "./UpLoadImg.vue";
import { ref, reactive } from "vue";
import WangEditor from "./WangEditor.vue"
const ruleForm = ref(null)
// 表单数据
let myForm = reactive({
  id: "",
  title: "",
  num: "",
  price: "",
  sellPoint: "",
  image: [],
  descs: "",
  category: "",
  cid: "",
  isShow: true
});
// 表单验证规则
const rules = reactive({
  title: [
    { required: true, message: "请输入商品名称", trigger: "blur" }
    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
  price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
  category: [
    {
      required: true,
      message: "请选择商品类目"
    }
  ]
});

/* 
    接收TreeProduct组件传递过来的数据，给页面的 所属分类 赋值渲染
*/
const getTreeData = (val) => {
    // console.log(val)
    myForm.cid = val.cid
    myForm.category = val.name
};

/* 
    获取图片上传组件传递过来的数据
*/
const sendImgUrl = (val) => {
    myForm.image.push(val)
}

/* 
    获取wangEditor组件传递过来的数据
*/
const sendEangEditor = (val)=>{
  // console.log('add')
  // console.log(val)
  myForm.descs = val
}
</script>
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="nav">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <TreeProduct @getTreeData="getTreeData"></TreeProduct>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="wrapper">
          <div class="my-title">商品添加</div>
          <el-form
            :model="myForm"
            ref="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- prop是model的键名 -->
            <el-form-item label="所属分类" prop="category">
              <span>{{ myForm.category }}</span>
            </el-form-item>
            <el-form-item label="商品名称" prop="title">
              <el-input v-model="myForm.title"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="myForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
              <el-input v-model="myForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
              <el-input v-model="myForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="image">
              <!-- <UploadImg
                @sendImgUrl="sendImgUrl"
                :fileList="fileList"
                ref="upload"
              ></UploadImg> -->
              <UpLoadImg @sendImgUrl="sendImgUrl"></UpLoadImg>
            </el-form-item>
            <el-form-item label="商品描述" prop="descs">
              <!-- <WangEditor
                @sendWangEditor="sendWangEditor"
                ref="wangEditor"
              ></WangEditor> -->
              <WangEditor @sendEangEditor="sendEangEditor"></WangEditor>
            </el-form-item>
            <el-form-item label="首页轮播推进" prop="isShow">
              <el-switch
                v-model="myForm.isShow"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否推荐商品" prop="isShow">
              <el-switch
                v-model="myForm.isShow"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否上架商品" prop="isShow">
              <el-switch
                v-model="myForm.isShow"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>

            <!-- <el-form-item>
              <el-button
                v-if="store.title != '详情'"
                type="primary"
                @click="submitForm(ruleForm)"
                >保存</el-button
              >
              <el-button
                v-if="store.title != '详情'"
                @click="resetForm('ruleForm')"
                >重置</el-button
              >
              <el-button @click="closePage">取消</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.nav {
  height: 600px;
  background: #fff;
  .title {
    background: skyblue;
    padding: 20px;
    color: #fff;
  }
  .tree {
    padding: 10px;
  }
}
.wrapper {
  /* height: 800px; */
  background: #fff;
  .my-title {
    background: #eee;
    padding: 14px;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .demo-ruleForm {
    padding: 14px;
  }
}
</style>

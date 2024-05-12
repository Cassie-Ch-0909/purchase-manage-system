<script setup>
import TreeProduct from "./TreeProduct.vue";
import UpLoadImg from "./UpLoadImg.vue";
import { ref, reactive, nextTick } from "vue";
import WangEditor from "./WangEditor.vue";
import { addGoodsAPI, updateTbItemAPI } from "@/api/product.js";
import { ElMessage } from "element-plus";
import router from "@/router";
import useGoodsStore from "@/stores/GoodsInfo.js";
// 获取仓库的方法
const store = useGoodsStore();
const ruleForm = ref(null);
const { title, rowData } = store;
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
const getTreeData = val => {
  // console.log(val)
  myForm.cid = val.cid;
  myForm.category = val.name;
};

/* 
    获取图片上传组件传递过来的数据
*/
const sendImgUrl = val => {
  myForm.image.push(val);
};

/* 
    获取wangEditor组件传递过来的数据
*/
const sendEangEditor = val => {
  // console.log('add')
  // console.log(val)
  myForm.descs = val;
};

/* 
    点击提交按钮保存数据
*/

// 调用添加商品接口
async function addGoods() {
  let {
    id,
    title,
    image,
    sellPoint,
    price,
    cid,
    category,
    num,
    descs
  } = myForm;
  const res = await addGoodsAPI({
    id,
    title,
    image: JSON.stringify(image),
    sellPoint,
    price,
    cid,
    category,
    num,
    descs
  });
  // console.log(res);
  if (res.data.status == 200) {
    ElMessage({
      message: "添加商品成功",
      type: "success"
    });
    //跳转路由
    router.push("/product/productList");
  }
}

/* 
    调用编辑商品的接口 
    updateTbItemAPI
*/
async function updateGoods() {
  let {
    id,
    title,
    image,
    sellPoint,
    price,
    cid,
    category,
    num,
    descs
  } = myForm;
  const res = await updateTbItemAPI({
    id,
    title,
    image: JSON.stringify(image),
    sellPoint,
    price,
    cid,
    category,
    num,
    descs
  });
  if (res.data.status == 200) {
    ElMessage({
      message: "编辑商品成功",
      type: "success"
    });
    //跳转路由
    router.push("/product/productList");
  }
}

// 提交按钮
const submitform = async formEl => {
  // console.log("保存", myForm);
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      if (title === "添加") {
        addGoods();
      } else {
        // 编辑
        updateGoods();
      }
    } else {
      console.log("error submit!!");
      // return false;
    }
  });
};

// 图片数组
const fileList = ref([]);
// wangEditor实例
const wangEditor = ref(null);

// 监听 title变量修改
// 获取当前的rowData数据，必须是编辑界面
if (title === "编辑"|| store.title=='详情') {
  // myForm = rowData;
  Object.assign(myForm, rowData);
  console.log("99", myForm.category);
  // 图片需要转数组
  // myForm.image = JSON.parse(rowData.image);
  // 图片回显
  const arr = JSON.parse(rowData.image);
  myForm.image = arr;
  // 图片回显 需要一个数组容器装图片 发送给子组件uploadImg
  let img = []; // fileList = [{name:'',url:''}]
  /* 
        使用了数组的 forEach() 方法来遍历数组 arr 中的每个元素 ele。
        对于每个元素，它创建了一个新的空对象 obj，然后将该元素赋值给 obj 的 url 属性，
        最后将这个包含了 url 属性的对象 obj 添加到另一个数组 img 中。
    */
  arr.forEach(ele => {
    let obj = {};
    obj.url = ele;
    img.push(obj);
  });
  fileList.value = img;
  // wangEditor回显
  // console.log(wangEditor, wangEditor.value);
  // 延迟加载
  nextTick(() => {
    // console.log("wangEditoe----", wangEditor, wangEditor.value);
    // console.log('wangEditoe',wangEditor.value.valueHtml)
    wangEditor.value.setWangHtml(myForm.descs);
  });
}

const upload = ref(null);
// 重置按钮
const resetForm = () => {
  if (store.title === "添加") {
    // 添加的时候是吧表单中所有内容清空
    // 表单重置
    ruleForm.value.resetFields();
    // upload.value.clear()
    fileList.value = [];
    wangEditor.value.clearHtml();
  } else {
    // console.log(0);
    // 编辑的时候是把表单内容恢复成点击进入页面的状态值
    // 恢复之前的默认值 默认值来自pinia
    // const { title, rowData } = store; rowData是从pinia中解构赋值出来的
    let rowData2 = JSON.parse(JSON.stringify(rowData));
    // 将rowData赋值给myForm
    Object.assign(myForm, rowData2);
    // 三个按钮是否打开
    ruleForm.value.isShow = true;

    // 对图片的处理 
    let imgs = rowData2.image; //字符串类型---需要转数组格式
    let arr = JSON.parse(imgs); //转数组
    // console.log("---arr---", arr);
    ruleForm.value.image = arr;
    // console.log('arr---', arr);
    fileList.value = [];
    arr.forEach(ele => {
      fileList.value.push({ name: "", url: ele }); //fileList 回显图片--传递给UploadImg组件
    });
    // 对wangEditor的处理
    nextTick(() => {
      wangEditor.value.setWangHtml(myForm.descs);
    });
  }
};

// 取消按钮
const closePage = () => {
  router.push("/product/productList");
};
</script>
<template>
  <div>
    <Breadcrumb></Breadcrumb>
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
          <div class="my-title">商品{{ store.title }}</div>
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
              <UpLoadImg
                @sendImgUrl="sendImgUrl"
                :fileList="fileList"
                ref="upload"
              ></UpLoadImg>
            </el-form-item>
            <el-form-item label="商品描述" prop="descs">
              <!-- <WangEditor
                @sendWangEditor="sendWangEditor"
                ref="wangEditor"
              ></WangEditor> -->
              <WangEditor
                @sendEangEditor="sendEangEditor"
                ref="wangEditor"
              ></WangEditor>
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
            <el-form-item>
              <el-button v-if="store.title!='详情'" type="primary" @click="submitform(ruleForm)"
                >保存</el-button
              >
              <el-button v-if="store.title!='详情'" @click="resetForm">重置</el-button>
              <el-button @click="closePage">取消</el-button>
            </el-form-item>
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

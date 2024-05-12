<script setup>
import { reactive, ref } from "vue";
import { itemCategoryAPI } from "@/api/product";
import Dialog from "./Dialog.vue";
// const renderContent = (h, { node, data }) => {
//   console.log(node, data);
//   return h(
//     "span",
//     {
//       class: "custom-tree-node"
//     },
//     h("span", null, data.name),
//     h(
//       "span",
//       null,
//       h(
//         "a",
//         {
//           onClick: () => append(data)
//         },
//         "Append "
//       ),
//       h(
//         "a",
//         {
//           style: "margin-left: 8px",
//           onClick: () => remove(node, data)
//         },
//         "Delete"
//       )
//     )
//   );
// };

const data = reactive({
  result: [
    {
      id: 1,
      name: "一级 1",
      children: [
        {
          id: 4,
          name: "二级 1-1"
        }
      ]
    },
    {
      id: 2,
      name: "一级 2"
    }
  ]
});

/* 
    获取商品分类
*/
async function itemCategory() {
  const res = await itemCategoryAPI();
  let arr = res.data.result;
  //获取一级目录
  let oneArr = [],
    otherArr = [];
  arr.forEach(ele => {
    if (ele.type == 1) {
      ele.children = [];
      oneArr.push(ele);
    } else {
      otherArr.push(ele);
    }
  });
  //   console.log(oneArr, otherArr);
  //继续遍历数组--获取数据结构---------
  oneArr.forEach(item => {
    //item.cid  一级信息标识
    otherArr.forEach(ele => {
      if (ele.type === item.cid) {
        item.children.push(ele);
      }
    });
  });
  data.result = oneArr;
  console.log("dataSource", data.result);
}
itemCategory();

// Dialog组件绑定ref为child
const child = ref(null);
// 父传子dialog标题
const info = ref({
  title: "标题"
});

/* 
    新增按钮
*/
function append(data) {
  // console.log('append')
  console.log(data); // {id: 1, name: '新鲜水果', cid: 1001, type: 1, children: Array(6)}
  console.log(child.value.dialogVisible);
  child.value.dialogVisible = true;
  info.value = {
    title: `新增【${data.name}】子级分类`,
    cid: data.cid
  };
}

/* 
    修改按钮
*/
function update() {
  console.log("update");
}

/* 
    删除按钮
*/
function remove() {
  console.log("remove");
}
</script>
<template>
  <div class="category">
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <el-tree
          style="max-width: 600px"
          :data="data.result"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <!-- <span class='name'>{node.label}</span>
              {
                node.level == 1 ? <span>
                  <el-button class='mini' size="small" onClick={() => append(data)} ><el-icon><Plus /></el-icon>新增</el-button>
                  <el-button class='mini' size="small" onClick={() => update(node, data)} ><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
                </span> : <span>
                  <el-button class='mini' size="small" onClick={() => update(node, data)}><el-icon><EditPen /></el-icon>修改</el-button>
                  <el-button class='mini' size="small" type="danger" onClick={() => remove(node, data)}><el-icon><Delete /></el-icon>删除</el-button>
                </span>
              } -->
              <span class="name">{{ data.name }}</span>
              <template v-if="node.level == 1">
                <span>
                  <el-button class="mini" size="small" @click="append(data)"
                    ><el-icon><Plus /></el-icon>新增</el-button
                  >
                  <el-button
                    class="mini"
                    size="small"
                    @click="update(node, data)"
                    ><el-icon><EditPen /></el-icon>修改</el-button
                  >
                  <el-button
                    class="mini"
                    size="small"
                    type="danger"
                    @click="remove(node, data)"
                    ><el-icon><Delete /></el-icon>删除</el-button
                  >
                </span>
              </template>
              <template v-else>
                <span>
                  <el-button
                    class="mini"
                    size="small"
                    @click="update(node, data)"
                    ><el-icon><EditPen /></el-icon>修改</el-button
                  >
                  <el-button
                    class="mini"
                    size="small"
                    type="danger"
                    @click="remove(node, data)"
                    ><el-icon><Delete /></el-icon>删除</el-button
                  >
                </span>
              </template>
            </span>
          </template>
        </el-tree>
      </div>
      <Dialog ref="child" :info="info" @updateViews="itemCategory"></Dialog>
    </div>
  </div>
</template>
<style scoped lang="scss">
.category {
  margin: 10px;
}
.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;
  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }
  .tree {
    margin: 10px;

    ::v-deep .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    ::v-deep .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  ::v-deep .name {
    width: 300px;
    display: inline-block;
  }
}
</style>

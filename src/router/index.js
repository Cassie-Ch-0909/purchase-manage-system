import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/layout/Index.vue";
import Login from "../views/login/Login.vue";
import Home from "../views/home/Home.vue";

// 产品管理
const Product = () => import("../views/product/Index.vue");
const ProductList = () => import("../views/product/list/List.vue");
const ProductCategory = () => import("../views/product/category/Category.vue");
const AddProduct = () => import("../views/product/addProduct/AddProduct.vue");

// 订单
const Order = () => import("../views/order/Index.vue");
const OrderList = () => import("../views/order/list/List.vue");
const OrderCollect = () => import("../views/order/collect/Collect.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta:{
        title:"首页"
      },
      // layout右侧Header下方的内容
      children: [
        // 首页
        {
          path: "/",
          name: "home",
          component: Home,
          meta:{
            title:"首页"
          }
        },
        // 产品管理
        {
          path: "/product",
          name: "product",
          component: Product,
          meta:{
            title:"产品管理"
          },
          children: [
            {
              path: "productList",
              name: "productList",
              component: ProductList,
              meta:{
                title:"产品列表"
              }
            },
            {
              path: "category",
              name: "category",
              component: ProductCategory,
              meta:{
                title:"产品分类"
              }
            },
            {
              path: "addProduct",
              name: "addProduct",
              component: AddProduct,
              meta: {
                activeMenu: "/product/productList",
                title:"产品分类"
              }
            }
          ]
        },
        // 订单管理
        {
          path: "/order",
          name: "order",
          component: Order,
          meta:{
            title:"订单管理"
          },
          children: [
            {
              path: "orderList",
              name: "orderList",
              component: OrderList,
              meta:{
                title:"订单列表"
              }
            },
            {
              path: "collect",
              name: "collect",
              component: OrderCollect,
              meta:{
                title:"订单汇总"
              }
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

export default router;
